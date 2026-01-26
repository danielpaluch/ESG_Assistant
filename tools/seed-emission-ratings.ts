import * as fs from 'node:fs';
import * as path from 'node:path';
import mongoose from 'mongoose';
import databaseConfig from '../apps/esg-assistant-server/src/infrastructure/database/database.config';

type CsvRow = string[];

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function parseCsv(content: string): CsvRow[] {
  const rows: CsvRow[] = [];
  let row: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i += 1) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(current);
      current = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i += 1;
      row.push(current);
      if (row.length > 1 || row[0] !== '') {
        rows.push(row);
      }
      row = [];
      current = '';
      continue;
    }

    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current);
    rows.push(row);
  }

  return rows;
}

function normalizeHeader(header: string) {
  return header.trim().toLowerCase();
}

function coerceValue(value: string) {
  const trimmed = value.trim();
  if (trimmed === '') return null;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }
  return trimmed;
}

function cleanRecord(record: Record<string, unknown>) {
  for (const [key, value] of Object.entries(record)) {
    if (typeof value === 'number' && (!Number.isFinite(value) || Number.isNaN(value))) {
      record[key] = null;
    }
  }
  return record;
}

async function loadCsv(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');
  const rows = parseCsv(content);
  if (rows.length === 0) return [];

  const headers = rows[0].map(normalizeHeader);
  const records: Record<string, unknown>[] = [];

  for (const row of rows.slice(1)) {
    if (row.every((cell) => cell.trim() === '')) continue;
    const record: Record<string, unknown> = {};
    headers.forEach((header, index) => {
      record[header] = coerceValue(row[index] ?? '');
    });
    records.push(cleanRecord(record));
  }

  return records;
}

async function main() {
  const repoRoot = process.cwd();
  loadEnvFile(path.join(repoRoot, 'apps', 'esg-assistant-server', '.env'));
  loadEnvFile(path.join(repoRoot, '.env'));

  const db = databaseConfig();
  await mongoose.connect(db.uri, db.options as mongoose.ConnectOptions);

  const dataDir = path.join(
    repoRoot,
    'libs',
    'esg-assistant-server',
    'emissions',
    'infrastructure',
    'src',
    'lib',
    'data',
  );

  const files = fs
    .readdirSync(dataDir)
    .filter((file) => file.toLowerCase().endsWith('.csv'));

  const collection = mongoose.connection.collection('emission_ratings');
  await collection.deleteMany({});

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const records = await loadCsv(filePath);
    if (records.length > 0) {
      await collection.insertMany(records);
      console.log(`Imported ${records.length} records from ${file}`);
    }
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
