import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EmissionsService } from '@esg-assistant-server/emissions/application';
import { CurrentUser } from '@esg-assistant-server/auth/api';
import { JwtAuthGuard } from '@shared-server/jwt';
import { CreateEmissionReportHttpRequestDto } from '../dtos/emission-report.dto';

@UseGuards(JwtAuthGuard)
@Controller('emissions')
export class EmissionsController {
  constructor(private readonly emissionsService: EmissionsService) {}

  @Get('properties')
  async fetchProperties() {
    return { data: await this.emissionsService.fetchProperties() };
  }

  @Post()
  async createEmissionReport(
    @Body() body: CreateEmissionReportHttpRequestDto,
    @CurrentUser() currentUser: { sub: string },
  ) {
    return this.emissionsService.createEmissionReport(body, currentUser.sub);
  }

  @Get()
  async listEmissionReports() {
    return this.emissionsService.listEmissionReports();
  }

  @Get(':emissionType')
  async getEmissionsByType(@Param('emissionType') emissionType: string) {
    return this.emissionsService.getEmissionsByType(emissionType);
  }
}
