import { EmissionRecordDto } from '@shared/contracts/emissions';

export type EmissionRecordProps = Omit<EmissionRecordDto, 'id'>;

export class EmissionRecord {
  private constructor(private readonly props: EmissionRecordDto) {}

  // use-cases
  static create(props: EmissionRecordProps): EmissionRecord;
  // repository create
  static create(props: EmissionRecordDto): EmissionRecord;

  static create(props: EmissionRecordProps | EmissionRecordDto): EmissionRecord {
    if ('id' in props) {
      return new EmissionRecord(props);
    }

    return new EmissionRecord({ ...props, id: '' });
  }

  get id(): string {
    return this.props.id;
  }

  get companyId(): string {
    return this.props.company_id;
  }

  get userId(): string {
    return this.props.user_id;
  }

  mapToResponse(): EmissionRecordDto {
    return { ...this.props };
  }

  toPrimitives(): EmissionRecordProps {
    return {
      name: this.props.name,
      description: this.props.description,
      company_id: this.props.company_id,
      user_id: this.props.user_id,
      emissions: this.props.emissions,
      produced_co2: this.props.produced_co2,
      submitted_at: this.props.submitted_at,
    };
  }
}
