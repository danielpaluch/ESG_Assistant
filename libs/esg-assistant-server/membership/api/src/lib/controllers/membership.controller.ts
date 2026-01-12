import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MembershipService } from '@esg-assistant-server/membership/application';
import { JwtAuthGuard } from '@shared-server/jwt';
import { GetMembershipDetails } from '@shared/membership';
import { UserDetails } from '@shared/contracts/users';
import { CreateMembershipHttpRequestDto } from '../dtos/membership.dto';

@UseGuards(JwtAuthGuard)
@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post()
  async createMembership(
    @Body() body: CreateMembershipHttpRequestDto,
  ): Promise<UserDetails> {
    return this.membershipService.createMembership(body.userId, body.companyId);
  }

  @Put(':id/accept')
  async acceptMembership(
    @Param('id') id: string,
  ): Promise<GetMembershipDetails> {
    return this.membershipService.acceptMembership(id);
  }

  @Put(':id/deny')
  async denyMembership(@Param('id') id: string): Promise<GetMembershipDetails> {
    return this.membershipService.denyMembership(id);
  }

  @Get('user/:id/extended')
  async getUsersByUserIdExtendedData(
    @Param('id') id: string,
  ): Promise<UserDetails[]> {
    return this.membershipService.getUsersByUserIdExtendedData(id);
  }

  @Get('company/:id/extended')
  async getUsersByCompanyIdExtendedData(
    @Param('id') id: string,
  ): Promise<UserDetails[]> {
    return this.membershipService.getUsersByCompanyIdExtendedData(id);
  }

  @Get('user/:id')
  async getMembershipIdsByUserId(@Param('id') id: string): Promise<string[]> {
    return this.membershipService.getMembershipIdsByUserId(id);
  }

  @Get('company/:id')
  async getMembershipIdsByCompanyId(
    @Param('id') id: string,
  ): Promise<string[]> {
    return this.membershipService.getMembershipIdsByCompanyId(id);
  }

  @Get(':id')
  async getMembershipById(
    @Param('id') id: string,
  ): Promise<GetMembershipDetails> {
    return this.membershipService.getMembershipById(id);
  }
}
