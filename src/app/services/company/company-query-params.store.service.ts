import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CompanyRequestType } from './company-api.types';
import { Page, PageSize } from '../../lib/constants/query-params.constants';

@Injectable({
  providedIn: 'root',
})
export class CompanyQueryParamsStoreService {
  private queryParamsSubject = new BehaviorSubject<CompanyRequestType>({
    ...JSON.parse(localStorage.getItem('queryParams') || '{}'),

    page: Page,
    pageSize: PageSize,
  });

  public queryParams$ = this.queryParamsSubject.asObservable();

  setQueryParams(nextParams: CompanyRequestType): void {
    const prevParams = this.queryParamsSubject.value;

    this.queryParamsSubject.next({ ...prevParams, ...nextParams });
  }

  getQueryParams(): CompanyRequestType {
    localStorage.setItem('queryParams', JSON.stringify(this.queryParamsSubject.value));

    return this.queryParamsSubject.value;
  }

  resetParams() {
    localStorage.removeItem('queryParams');

    this.queryParamsSubject.next({ page: Page, pageSize: PageSize });
  }
}
