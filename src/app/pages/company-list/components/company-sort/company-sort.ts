import { Component, OnDestroy, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyApiService } from '../../../../services/company/company-api.service';
import { SortType } from '../../../../data/interfaces/interface-sort';
import { CompanyStoreService } from '../../../../services/company/company-store.service';
import { Page, PageSize } from '../../../../lib/constants/query-params.constants';
import { CompanyQueryParamsStoreService } from '../../../../services/company/company-query-params.store.service';
import { Subscription } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-sort',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './company-sort.html',
  styleUrl: './company-sort.scss',
})
export class CompanySort implements OnInit, OnDestroy {
  private companyApiService = inject(CompanyApiService);
  private companyStoreService = inject(CompanyStoreService);
  private companyQueryParamsStoreService: CompanyQueryParamsStoreService = inject(
    CompanyQueryParamsStoreService
  );
  private subscription = new Subscription();

  options: SortType[] = ['empty', 'id', 'name', 'type', 'industry'];
  selectedOption = new FormControl<SortType>('empty');

  onSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    this.selectedOption.setValue(selectElement.value as SortType);

    this.companyQueryParamsStoreService.setQueryParams({
      page: Page,
      pageSize: PageSize,
      sort:
        this.selectedOption.value === 'empty' || this.selectedOption.value === null
          ? undefined
          : this.selectedOption.value,
    });

    this.companyApiService
      .getCompanies()
      .subscribe((response) => this.companyStoreService.setCompanies(response.data));
  }

  ngOnInit(): void {
    this.subscription = this.companyQueryParamsStoreService.queryParams$.subscribe((params) => {
      this.selectedOption.setValue(params.sort || 'empty');
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
