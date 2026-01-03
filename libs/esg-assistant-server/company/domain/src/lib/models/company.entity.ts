import { GetCompanyDetailsResponse } from '@shared/contracts/company';

export interface ICompanyProps {
  id?: string;
  name: string;
  description?: string;
  address: string;
  nip: string;
}

export class Company {
  private constructor(private readonly props: ICompanyProps) {}

  static create(props: ICompanyProps): Company {
    if (!props.name?.trim()) {
      throw new Error('Name is required');
    }
    return new Company(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  mapToResponse(): GetCompanyDetailsResponse {
    return {
      id: this.props.id,
      name: this.props.name,
      description: this.props.description,
      address: this.props.address,
      nip: this.props.nip,
    };
  }

  toPrimitives(): ICompanyProps {
    return {
      name: this.props.name,
      description: this.props.description,
      address: this.props.address,
      nip: this.props.nip,
    };
  }
}
