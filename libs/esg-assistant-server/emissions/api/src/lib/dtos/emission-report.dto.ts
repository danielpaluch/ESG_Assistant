import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateEmissionReportPayload } from '@shared/contracts/emissions';

export class CreateEmissionReportHttpRequestDto
  implements CreateEmissionReportPayload
{
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty({ message: 'Company id is required' })
  company_id!: string;

  @IsArray()
  emissions!: CreateEmissionReportPayload['emissions'];
}
