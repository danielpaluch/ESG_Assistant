export interface PaginatedResponse<T> {
  items: T[];
  results: number;
  page: number;
  per_page: number;
}
