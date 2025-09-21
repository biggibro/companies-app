import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { CompanyApiService } from '../../../../services/company/company-api.service';
import { CompanyQueryParamsStoreService } from '../../../../services/company/company-query-params.store.service';
import { CompanyStoreService } from '../../../../services/company/company-store.service';

@Component({
  selector: 'app-reset-filters-button',
  imports: [],
  templateUrl: './reset-filters-button.html',
  styleUrl: './reset-filters-button.scss',
})
export class ResetFiltersButton {
  private companyApiService = inject(CompanyApiService);
  private companyStoreService = inject(CompanyStoreService);

  private companyQueryParamsStoreService: CompanyQueryParamsStoreService = inject(
    CompanyQueryParamsStoreService
  );

  onResetFilters() {
    this.companyQueryParamsStoreService.resetParams();

    this.companyApiService
      .getCompanies()
      .subscribe((response) => this.companyStoreService.setCompanies(response.data));
  }
}
