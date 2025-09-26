import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, inject } from '@angular/core';
import { CompanyItem } from './components/company-item/company-item';
import { CompanySort } from './components/company-sort/company-sort';
import { CompanyApiService } from '../../services/company/company-api.service';
import { CompanyFilter } from './components/company-filter/company-filter';
import { ResetFiltersButton } from './components/reset-filters-button/reset-filters-button';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-list',
  imports: [CommonModule, CompanyItem, CompanySort, CompanyFilter, ResetFiltersButton],
  templateUrl: './company-list.html',
  styleUrl: './company-list.scss',
})
export class CompanyList implements OnInit {
  public companyApiService = inject(CompanyApiService);
  private activatedRoute = inject(ActivatedRoute);

  private fetchCompanies = effect(() => {
    this.activatedRoute.queryParams.subscribe((params) =>
      this.companyApiService.getCompanies(params)
    );
  });

  ngOnInit(): void {
    // this.companyApiService.getCompanies();

    this.companyApiService.getTypes();

    this.companyApiService.getIndustries();
  }
}
