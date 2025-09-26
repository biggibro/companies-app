import { Injectable, signal } from '@angular/core';
import { CompanyRequestType } from './company-api.types';
import { Page, PageSize } from '../../lib/constants/query-params.constants';

@Injectable({
  providedIn: 'root',
})
export class CompanyQueryParamsStoreService {
  private queryParams = signal<CompanyRequestType>({
    ...JSON.parse(localStorage.getItem('queryParams') || '{}'),

    page: Page,
    pageSize: PageSize,
  });

  setQueryParams(nextParams: CompanyRequestType): void {
    const prevParams = this.queryParams();

    const mergeParams = { ...prevParams, ...nextParams };

    localStorage.setItem('queryParams', JSON.stringify(mergeParams));

    this.queryParams.set(mergeParams);
  }

  getQueryParams(): CompanyRequestType {
    return this.queryParams();
  }

  resetParams() {
    localStorage.removeItem('queryParams');

    this.queryParams.update(() => {
      return {};
    });
  }
}
