import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { CreateCompanyPayload } from 'shared/contracts/company';

export class CreateCompanyHttpRequestDto implements CreateCompanyPayload {
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
