import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CompanyApiService } from '../../../../services/company/company-api.service';
import { CompanyStoreService } from '../../../../services/company/company-store.service';
import { Page, PageSize } from '../../../../lib/constants/query-params.constants';
import { CompanyQueryParamsStoreService } from '../../../../services/company/company-query-params.store.service';
import { Subscription } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortType } from '../../../../data/interfaces/interface-sort';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-filter',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './company-filter.html',
  styleUrl: './company-filter.scss',
})
export class CompanyFilter implements OnInit, OnDestroy {
  private companyApiService = inject(CompanyApiService);
  private companyStoreService = inject(CompanyStoreService);
  private companyQueryParamsStoreService: CompanyQueryParamsStoreService = inject(
    CompanyQueryParamsStoreService
  );
  private subscription = new Subscription();

  filter = new FormControl<string>('');

  types: string[] = ['empty'];
  selectedType = new FormControl<string>('empty');

  onSelectType(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    this.selectedType.setValue(selectElement.value as SortType);

    this.companyQueryParamsStoreService.setQueryParams({
      page: Page,
      pageSize: PageSize,
      company_type:
        this.selectedType.value === 'empty' || this.selectedType.value === null
          ? undefined
          : this.selectedType.value,
    });

    this.companyApiService
      .getCompanies()
      .subscribe((response) => this.companyStoreService.setCompanies(response.data));
  }

  industries: string[] = ['empty'];
  selectedIndustry = new FormControl<string>('empty');

  onSelectIndustry(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    this.selectedType.setValue(selectElement.value as SortType);

    this.companyQueryParamsStoreService.setQueryParams({
      page: Page,
      pageSize: PageSize,
      industry:
        this.selectedIndustry.value === 'empty' || this.selectedIndustry.value === null
          ? undefined
          : this.selectedIndustry.value,
    });

    this.companyApiService
      .getCompanies()
      .subscribe((response) => this.companyStoreService.setCompanies(response.data));
  }

  onChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.filter.setValue(inputElement.value);

    this.companyQueryParamsStoreService.setQueryParams({
      page: Page,
      pageSize: PageSize,
      filter: !this.filter.value ? '' : this.filter.value,
    });

    this.companyApiService
      .getCompanies()
      .subscribe((response) => this.companyStoreService.setCompanies(response.data));
  }

  ngOnInit(): void {
    this.subscription = this.companyQueryParamsStoreService.queryParams$.subscribe((params) => {
      this.filter.setValue(params.filter || '');
    });

    this.subscription = this.companyQueryParamsStoreService.queryParams$.subscribe((params) => {
      this.selectedType.setValue(params.company_type || '');
    });

    this.subscription = this.companyQueryParamsStoreService.queryParams$.subscribe((params) => {
      this.selectedIndustry.setValue(params.industry || '');
    });

    this.subscription = this.companyStoreService.types$.subscribe((types) => {
      this.types = ['empty', ...types];
    });

    this.subscription = this.companyStoreService.industries$.subscribe((industries) => {
      this.industries = ['empty', ...industries];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
