import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EmissionRecord,
  EmissionRepositoryPort,
  EmissionFactorQuery,
} from '@esg-assistant-server/emissions/domain';
import { EmissionRatingDto } from '@shared/contracts/emissions';
import { EmissionRecordDocument } from './schemas/emission-record.schema';

export class EmissionMongooseRepository implements EmissionRepositoryPort {
  constructor(
    @InjectModel('EmissionRating')
    private readonly emissionRatingModel: Model<Record<string, unknown>>,
    @InjectModel('EmissionRecord')
    private readonly emissionRecordModel: Model<EmissionRecordDocument>,
  ) {}

  async save(record: EmissionRecord): Promise<EmissionRecord> {
    const doc = await this.emissionRecordModel.create(record.toPrimitives());

    return EmissionRecord.create({
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      user_id: doc.user_id,
      company_id: doc.company_id,
      emissions: doc.emissions,
      produced_co2: doc.produced_co2,
      submitted_at: doc.submitted_at,
    });
  }

  async findAll(): Promise<EmissionRecord[]> {
    const docs = await this.emissionRecordModel.find().lean();
    return docs.map((doc) =>
      EmissionRecord.create({
        id: doc._id.toString(),
        name: doc.name,
        description: doc.description,
        user_id: doc.user_id,
        company_id: doc.company_id,
        emissions: doc.emissions,
        produced_co2: doc.produced_co2,
        submitted_at: doc.submitted_at,
      }),
    );
  }

  async findByCompanyId(companyId: string): Promise<EmissionRecord[]> {
    const docs = await this.emissionRecordModel
      .find({ company_id: companyId })
      .lean();
    return docs.map((doc) =>
      EmissionRecord.create({
        id: doc._id.toString(),
        name: doc.name,
        description: doc.description,
        user_id: doc.user_id,
        company_id: doc.company_id,
        emissions: doc.emissions,
        produced_co2: doc.produced_co2,
        submitted_at: doc.submitted_at,
      }),
    );
  }

  async findEmissionFactor(query: EmissionFactorQuery): Promise<number | null> {
    const queryKeys: (keyof EmissionFactorQuery)[] = [
      'type',
      'category',
      'fuel',
      'material',
      'sub_type',
      'vehicle_group',
      'vehicle',
      'propulsion',
    ];

    const baseQuery = Object.fromEntries(
      queryKeys
        .filter((key) => query[key])
        .map((key) => [key, this.ciRegex(query[key] as string)]),
    ) as Record<string, unknown>;

    let dbQuery: Record<string, unknown> | null = null;

    // Some data have different spelling of litres
    if (query.unit) {
      const unitAlts = [query.unit];
      if (query.unit.toLowerCase() === 'litres') unitAlts.push('liters');
      if (query.unit.toLowerCase() === 'liters') unitAlts.push('litres');
      const unitOr = unitAlts.map((unit) => ({
        unit: this.ciRegex(unit),
      }));

      dbQuery = Object.keys(baseQuery).length
        ? { $and: [baseQuery, { $or: unitOr }] }
        : { $or: unitOr };
    } else if (Object.keys(baseQuery).length) {
      dbQuery = baseQuery;
    }

    if (!dbQuery) {
      return null;
    }

    // Getting factor
    const doc = await this.emissionRatingModel
      .findOne(dbQuery, { _id: 0, kg_co2e: 1 })
      .lean();

    if (!doc || doc['kg_co2e'] === undefined || doc['kg_co2e'] === null) {
      return null;
    }

    return Number(doc['kg_co2e']);
  }

  async getEmissionsByType(type: string): Promise<EmissionRatingDto[]> {
    return this.emissionRatingModel
      .find({ type }, { _id: 0 })
      .lean() as Promise<EmissionRatingDto[]>;
  }

  async fetchProperties(): Promise<Record<string, Record<string, string[]>>> {
    const result: Record<string, Record<string, string[]>> = {};
    const allTypes = await this.emissionRatingModel.distinct('type');

    for (const type of allTypes) {
      const docs = await this.emissionRatingModel
        .find({ type }, { _id: 0 })
        .lean();

      const propertyMap: Record<string, Set<string>> = {};

      for (const doc of docs) {
        for (const [key, value] of Object.entries(doc)) {
          if (['type', 'kg_co2e', 'amount', 'year'].includes(key)) {
            continue;
          }

          if (typeof value === 'string') {
            propertyMap[key] = propertyMap[key] ?? new Set();
            propertyMap[key].add(value);
          } else if (Array.isArray(value)) {
            propertyMap[key] = propertyMap[key] ?? new Set();
            value.forEach((item) => propertyMap[key].add(String(item)));
          }
        }
      }

      result['type'] = Object.fromEntries(
        Object.entries(propertyMap).map(([k, v]) => [k, [...v].sort()]),
      );
    }

    return result;
  }

  private escapeRegex(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private ciRegex(value: string) {
    return new RegExp(`^${this.escapeRegex(value)}$`, 'i');
  }
}
