import { SortType } from '../../data/interfaces/interface-sort';

export interface CompanyRequestType {
  page: number;
  pageSize: number;
  sort?: SortType;
  filter?: string;
  industry?: string;
  company_type?: string;
}
