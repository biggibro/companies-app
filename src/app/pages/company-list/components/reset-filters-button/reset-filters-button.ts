import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-filters-button',
  imports: [],
  templateUrl: './reset-filters-button.html',
  styleUrl: './reset-filters-button.scss',
})
export class ResetFiltersButton {
  private router = inject(Router);

  onResetFilters() {
    this.router.navigate([], {
      queryParams: {},
      queryParamsHandling: 'replace',
    });
  }
}
