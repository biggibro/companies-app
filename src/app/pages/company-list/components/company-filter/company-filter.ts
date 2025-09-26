import { Component, effect, inject, OnDestroy } from '@angular/core';
import { CompanyApiService } from '../../../../services/company/company-api.service';
import { Subscription } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortType } from '../../../../data/interfaces/interface-sort';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-filter',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './company-filter.html',
  styleUrl: './company-filter.scss',
})
export class CompanyFilter implements OnDestroy {
  public companyApiService = inject(CompanyApiService);
  private router = inject(Router);

  private activatedRoute = inject(ActivatedRoute);

  private subscription = new Subscription();

  filter = new FormControl<string>(this.activatedRoute.snapshot.queryParams['q'] || '');

  selectedType = new FormControl<string>(
    this.activatedRoute.snapshot.queryParams['company_type'] || 'empty'
  );

  selectedIndustry = new FormControl<string>(
    this.activatedRoute.snapshot.queryParams['industry'] || 'empty'
  );

  onSelectType(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    this.selectedType.setValue(selectElement.value as SortType);

    this.router.navigate([], {
      queryParams: {
        company_type:
          this.selectedType.value === 'empty' || this.selectedType.value === null
            ? undefined
            : this.selectedType.value,
      },
      queryParamsHandling: 'merge',
    });
  }

  onSelectIndustry(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    this.selectedIndustry.setValue(selectElement.value as SortType);

    this.router.navigate([], {
      queryParams: {
        industry:
          this.selectedIndustry.value === 'empty' || this.selectedIndustry.value === null
            ? undefined
            : this.selectedIndustry.value,
      },
      queryParamsHandling: 'merge',
    });
  }

  onChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    this.filter.setValue(inputElement.value);

    this.router.navigate([], {
      queryParams: {
        q: this.filter.value || undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  private syncFormEffect = effect(() => {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.filter.setValue(params['q'] || '');
      this.selectedType.setValue(params['company_type'] || 'empty');
      this.selectedIndustry.setValue(params['industry'] || 'empty');
    });
  });

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
