import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyDTO } from '../../data/interfaces/interface-company';
import { Observable } from 'rxjs';
import { CompanyQueryParamsStoreService } from './company-query-params.store.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyApiService {
  private apiUrl = 'https://faker-api.milki.space';

  private http: HttpClient = inject(HttpClient);

  private companyQueryParamsStoreService: CompanyQueryParamsStoreService = inject(
    CompanyQueryParamsStoreService
  );

  getCompanies(): Observable<{ data: CompanyDTO[] }> {
    const queryParams = this.companyQueryParamsStoreService.getQueryParams();

    let sortParam = '?';

    if (queryParams.page) {
      sortParam = sortParam + `&page=${queryParams.page}`;
    }

    if (queryParams.pageSize) {
      sortParam = sortParam + `&per_page=${queryParams.pageSize}`;
    }

    if (queryParams?.sort) {
      sortParam = sortParam + `&sort_by=${queryParams.sort}`;
    }

    if (queryParams?.filter) {
      sortParam = sortParam + `&q=${queryParams.filter}`;
    }

    if (queryParams?.company_type) {
      sortParam = sortParam + `&company_type=${queryParams.company_type}`;
    }

    if (queryParams?.industry) {
      sortParam = sortParam + `&industry=${queryParams.industry}`;
    }

    return this.http.get<{ data: CompanyDTO[] }>(`${this.apiUrl}/companies${sortParam}`);
  }

  getCompaniesId(id: number): Observable<CompanyDTO> {
    return this.http.get<CompanyDTO>(`${this.apiUrl}/companies/${id}`);
  }

  getIndustries(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/industries`);
  }

  getTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/types`);
  }
}
