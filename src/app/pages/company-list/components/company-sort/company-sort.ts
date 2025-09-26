import { Component, effect, OnDestroy } from '@angular/core';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CompanyApiService } from '../../../../services/company/company-api.service';
import { SortType } from '../../../../data/interfaces/interface-sort';
// import { CompanyQueryParamsStoreService } from '../../../../services/company/company-query-params.store.service';
import { Subscription } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-sort',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './company-sort.html',
  styleUrl: './company-sort.scss',
})
export class CompanySort implements OnDestroy {
  // private companyApiService = inject(CompanyApiService);
  // private companyQueryParamsStoreService: CompanyQueryParamsStoreService = inject(
  // CompanyQueryParamsStoreService
  // );

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private subscription = new Subscription();

  options: SortType[] = ['empty', 'id', 'name', 'type', 'industry'];
  selectedOption = new FormControl<SortType>(
    this.activatedRoute.snapshot.queryParams['sort_by'] || 'empty'
  );

  onSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    this.selectedOption.setValue(selectElement.value as SortType);

    // this.companyQueryParamsStoreService.setQueryParams({
    //   sort:
    //     this.selectedOption.value === 'empty' || this.selectedOption.value === null
    //       ? undefined
    //       : this.selectedOption.value,
    // });

    this.router.navigate([], {
      queryParams: {
        sort_by:
          this.selectedOption.value === 'empty' || this.selectedOption.value === null
            ? undefined
            : this.selectedOption.value,
      },
      queryParamsHandling: 'merge',
    });

    // this.companyApiService.getCompanies();
  }

  private syncEffect = effect(() => {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.selectedOption.setValue(params['sort_by'] || 'empty');
    });
  });

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
