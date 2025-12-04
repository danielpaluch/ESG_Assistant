import { CreateCompanyRequestDto } from '@esg-assistant-server/company/contract';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateCompanyHttpRequestDto implements CreateCompanyRequestDto {
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsString()
  @Matches(/^\d{10}$/, {
    message: 'NIP must be exactly 10 digits',
  })
  nip: string;
}
