import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRepositoryPort } from '@esg-assistant-server/users/domain';

export class UserMongooseRepository implements UserRepositoryPort {
  constructor(
    @InjectModel('User')
    private readonly usersModel: Model<UserDocument>,
  ) {}

  async save(user: User): Promise<User> {
    const doc = await this.usersModel.create(user.toPrimitives());

    return User.create({
      id: doc._id.toString(),
      name: doc.name,
      last_name: doc.last_name,
      email: doc.email,
      address: doc.address,
      birth_date: doc.birth_date,
      auth0_userId: doc.auth0_userId,
      creation_date: doc.creation_date,
    });
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.usersModel.findOne({ _id: id }).exec();
    if (!doc) return null;

    return User.create({
      id: doc._id.toString(),
      name: doc.name,
      last_name: doc.last_name,
      email: doc.email,
      address: doc.address,
      birth_date: doc.birth_date,
      auth0_userId: doc.auth0_userId,
      creation_date: doc.creation_date,
    });
  }

  async findAll(
    page: number,
    per_page: number,
  ): Promise<{ items: User[]; results: number }> {
    const skip = (page - 1) * per_page;

    const [docs, results] = await Promise.all([
      this.usersModel.find().skip(skip).limit(per_page).exec(),
      this.usersModel.countDocuments().exec(),
    ]);

    const items = docs.map((doc) =>
      User.create({
        id: doc._id.toString(),
        name: doc.name,
        last_name: doc.last_name,
        email: doc.email,
        address: doc.address,
        birth_date: doc.birth_date,
        auth0_userId: doc.auth0_userId,
        creation_date: doc.creation_date,
      }),
    );

    return { items, results };
  }

  async findByAuth0Id(id: string): Promise<User | null> {
    const doc = await this.usersModel.findOne({ auth0_userId: id }).exec();

    if (!doc) return null;

    return User.create({
      id: doc._id.toString(),
      name: doc.name,
      last_name: doc.last_name,
      email: doc.email,
      address: doc.address,
      birth_date: doc.birth_date,
      auth0_userId: doc.auth0_userId,
      creation_date: doc.creation_date,
    });
  }
}
