import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Membership,
  MembershipRepositoryPort,
} from '@esg-assistant-server/membership/domain';
import { MembershipDocument } from './schemas/membership.schema';
import { User } from '@esg-assistant-server/users/domain';
import { UserDocument } from '@esg-assistant-server/users/infrastructure';

export class MembershipMongooseRepository implements MembershipRepositoryPort {
  constructor(
    @InjectModel('Membership')
    private readonly membershipModel: Model<MembershipDocument>,
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async save(userId: string, companyId: string): Promise<User> {
    await this.membershipModel.create({
      userId,
      companyId,
      role: null,
      joinedAt: new Date(),
      status: 'in acceptance',
    });

    const userDoc = await this.userModel.findOne({ _id: userId }).exec();

    if (!userDoc) {
      throw new Error('User not found');
    }

    return this.mapUser(userDoc);
  }

  async accept(membershipId: string): Promise<Membership> {
    const doc = await this.membershipModel
      .findOneAndUpdate(
        { _id: membershipId },
        { status: 'accepted' },
        { new: true },
      )
      .exec();

    if (!doc) {
      throw new Error('Membership not found');
    }

    return this.mapMembership(doc);
  }

  async deny(membershipId: string): Promise<Membership> {
    const doc = await this.membershipModel
      .findOneAndDelete({ _id: membershipId })
      .exec();

    if (!doc) {
      throw new Error('Membership not found');
    }

    return this.mapMembership(doc);
  }

  async findByMembershipId(id: string): Promise<Membership> {
    const doc = await this.membershipModel.findOne({ _id: id }).exec();

    if (!doc) {
      throw new Error('Membership not found');
    }

    return this.mapMembership(doc);
  }

  async findByUserId(id: string): Promise<string[]> {
    const docs = await this.membershipModel
      .find({ userId: id })
      .select('_id')
      .exec();

    return docs.map((doc) => doc._id.toString());
  }

  async findByCompanyId(companyId: string): Promise<string[]> {
    const docs = await this.membershipModel
      .find({ companyId })
      .select('_id')
      .exec();

    return docs.map((doc) => doc._id.toString());
  }

  async findByUserIdExtendedData(id: string): Promise<User[]> {
    const membershipDocs = await this.membershipModel
      .find({ userId: id })
      .select('userId')
      .exec();

    const userIds = membershipDocs.map((doc) => doc.userId);

    if (userIds.length === 0) {
      return [];
    }

    const userDocs = await this.userModel
      .find({ _id: { $in: userIds } })
      .exec();

    return userDocs.map((doc) => this.mapUser(doc));
  }

  async findByCompanyIdExtendedData(companyId: string): Promise<User[]> {
    const membershipDocs = await this.membershipModel
      .find({ companyId })
      .select('userId')
      .exec();

    const userIds = membershipDocs.map((doc) => doc.userId);

    if (userIds.length === 0) {
      return [];
    }

    const userDocs = await this.userModel
      .find({ _id: { $in: userIds } })
      .exec();

    return userDocs.map((doc) => this.mapUser(doc));
  }

  private mapMembership(doc: MembershipDocument): Membership {
    return Membership.create({
      id: doc._id.toString(),
      userId: doc.userId,
      companyId: doc.companyId,
      role: doc.role,
      joinedAt: doc.joinedAt,
      status: doc.status,
    });
  }

  private mapUser(doc: UserDocument): User {
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
