import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyDocument } from './schemas/company.schema';
import {
  Company,
  CompanyRepositoryPort,
} from '@esg-assistant-server/company/domain';

export class CompanyMongooseRepository implements CompanyRepositoryPort {
  constructor(
    @InjectModel('Company')
    private readonly companyModel: Model<CompanyDocument>
  ) {}

  async save(company: Company): Promise<Company> {
    const doc = await this.companyModel.create(company.toPrimitives());

    return Company.create({
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      owner_id: doc.owner_id,
      address: doc.address,
      nip: doc.nip,
    });
  }

  async findById(id: string): Promise<Company | null> {
    const doc = await this.companyModel.findOne({ _id: id }).exec();
    if (!doc) return null;

    return Company.create({
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      owner_id: doc.owner_id,
      address: doc.address,
      nip: doc.nip,
    });
  }

  async findAll(
    page: number,
    per_page: number
  ): Promise<{ items: Company[]; results: number }> {
    const skip = (page - 1) * per_page;

    const [docs, results] = await Promise.all([
      this.companyModel.find().skip(skip).limit(per_page).exec(),
      this.companyModel.countDocuments().exec(),
    ]);

    const items = docs.map((doc) =>
      Company.create({
        id: doc._id.toString(),
        name: doc.name,
        address: doc.address,
        owner_id: doc.owner_id,
        description: doc.description,
        nip: doc.nip,
      })
    );

    return { items, results };
  }
}
