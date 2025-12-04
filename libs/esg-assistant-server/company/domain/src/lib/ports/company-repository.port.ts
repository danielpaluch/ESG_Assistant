import { Company } from '../models/company.entity.js';

export const COMPANY_REPOSITORY = 'COMPANY_REPOSITORY';

export interface CompanyRepositoryPort {
  save(company: Company): Promise<Company>;

  findById(id: string): Promise<Company | null>;

  findAll(
    page: number,
    per_page: number
  ): Promise<{ items: Company[]; results: number }>;

  //   getOwnerById(id: string): Promise<void>; // implement User class
}
