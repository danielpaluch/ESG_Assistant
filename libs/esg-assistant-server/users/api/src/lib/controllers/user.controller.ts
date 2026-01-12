import { UserService } from '@esg-assistant-server/users/application';
import { PaginatedResponse } from '@esg-assistant/shared-server/pagination';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@shared-server/jwt';
import { UserDetails } from '@shared/contracts/users';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDetails | null> {
    return this.userService.getUserById(id);
  }

  @Get()
  async getAllUsers(
    @Query('page') page = 1,
    @Query('per_page') per_page = 10,
  ): Promise<PaginatedResponse<UserDetails>> {
    return this.userService.getAllUsers(page, per_page);
  }
}
