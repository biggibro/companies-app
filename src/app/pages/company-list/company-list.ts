import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CompanyDTO } from '../../data/interfaces/interface-company';
import { CompanyItem } from './components/company-item/company-item';
import { CompanySort } from './components/company-sort/company-sort';
import { CompanyApiService } from '../../services/company/company-api.service';
import { CompanyStoreService } from '../../services/company/company-store.service';
import { Subscription } from 'rxjs';
import { CompanyFilter } from './components/company-filter/company-filter';
import { ResetFiltersButton } from './components/reset-filters-button/reset-filters-button';

@Component({
  selector: 'app-company-list',
  imports: [CommonModule, CompanyItem, CompanySort, CompanyFilter, ResetFiltersButton],
  templateUrl: './company-list.html',
  styleUrl: './company-list.scss',
})
export class CompanyList implements OnInit, OnDestroy {
  private companyApiService = inject(CompanyApiService);
  private companyStoreService = inject(CompanyStoreService);
  public companies: CompanyDTO[] = [];

  private subscription = new Subscription();

  ngOnInit(): void {
    this.companyApiService.getCompanies().subscribe((response) => {
      this.companyStoreService.setCompanies(response.data);
    });

    this.companyApiService.getTypes().subscribe((response) => {
      this.companyStoreService.setTypes(response);
    });

    this.companyApiService.getIndustries().subscribe((response) => {
      this.companyStoreService.setIndustries(response);
    });

    this.subscription = this.companyStoreService.companies$.subscribe((companies) => {
      this.companies = companies;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
