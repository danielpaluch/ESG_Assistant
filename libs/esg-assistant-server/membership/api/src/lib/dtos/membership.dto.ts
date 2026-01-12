import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMembershipHttpRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'userId is required' })
  userId!: string;

  @IsString()
  @IsNotEmpty({ message: 'companyId is required' })
  companyId!: string;
}
