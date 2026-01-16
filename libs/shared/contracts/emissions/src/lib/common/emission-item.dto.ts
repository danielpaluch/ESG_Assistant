export interface EmissionItemDto {
  type: string;
  amount?: number;
  category?: string;
  unit?: string;
  fuel?: string;
  material?: string;
  sub_type?: string;
  vehicle_group?: string;
  vehicle?: string;
  propulsion?: string;
  year?: string | number;
}
