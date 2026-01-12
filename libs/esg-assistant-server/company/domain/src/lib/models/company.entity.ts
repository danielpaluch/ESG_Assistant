import {
  CompanyDto,
  GetCompanyDetailsResponse,
} from '@shared/contracts/company';

export type ICompanyProps = Omit<CompanyDto, 'id'>;

export class Company {
  private constructor(private readonly props: CompanyDto) {}

  //use-cases
  static create(props: ICompanyProps): Company;
  //Repository create
  static create(props: CompanyDto): Company;

  static create(props: ICompanyProps | CompanyDto): Company {
    if ('id' in props) {
      return new Company(props);
    }
    return new Company({ ...props, id: '' });
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
      owner_id: this.props.owner_id,
      description: this.props.description,
      address: this.props.address,
      nip: this.props.nip,
    };
  }

  toPrimitives(): ICompanyProps {
    return {
      name: this.props.name,
      description: this.props.description,
      owner_id: this.props.owner_id,
      address: this.props.address,
      nip: this.props.nip,
    };
  }
}
