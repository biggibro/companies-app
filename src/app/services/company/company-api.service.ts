import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyDTO } from '../../data/interfaces/interface-company';
import { Observable } from 'rxjs';
import { CompanyRequestType } from './company-api.types';

@Injectable({
  providedIn: 'root',
})
export class CompanyApiService {
  private apiUrl = 'https://faker-api.milki.space';

  private http = inject(HttpClient);

  loading = signal(false);

  compamies = signal<CompanyDTO[]>([]);

  loadingIndustries = signal(false);
  industries = signal<string[]>([]);

  loadingTypes = signal(false);
  types = signal<string[]>([]);

  getCompanies(params: CompanyRequestType) {
    this.loading.set(true);

    this.http
      .get<{ data: CompanyDTO[] }>(`${this.apiUrl}/companies`, {
        params: { ...params },
      })
      .subscribe({
        next: (response) => this.compamies.set(response.data),
        error: () => console.log('error'),
        complete: () => this.loading.set(false),
      });
  }

  getCompaniesId(id: number): Observable<CompanyDTO> {
    return this.http.get<CompanyDTO>(`${this.apiUrl}/companies/${id}`);
  }

  getIndustries() {
    this.loadingIndustries.set(true);
    this.http.get<string[]>(`${this.apiUrl}/industries`).subscribe({
      next: (response) => this.industries.set(['empty', ...response]),
      complete: () => this.loadingIndustries.set(false),
    });
  }

  getTypes() {
    this.loadingTypes.set(true);
    this.http.get<string[]>(`${this.apiUrl}/types`).subscribe({
      next: (response) => this.types.set(['empty', ...response]),
      complete: () => this.loadingTypes.set(false),
    });
  }
}
