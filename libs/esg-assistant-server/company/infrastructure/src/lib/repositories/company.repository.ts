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
      address: doc.address,
      nip: doc.nip,
    });
  }

  async findById(id: string): Promise<Company | null> {
    const doc = await this.companyModel.findOne({ id }).exec();
    if (!doc) return null;

    return Company.create({
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      address: doc.address,
      nip: doc.nip,
    });
  }

  async findAll(): Promise<Company[]> {
    const docs = await this.companyModel.find().exec();
    return docs.map((doc) =>
      Company.create({
        id: doc._id.toString(),
        name: doc.name,
        description: doc.description,
        address: doc.address,
        nip: doc.nip,
      })
    );
  }
}
