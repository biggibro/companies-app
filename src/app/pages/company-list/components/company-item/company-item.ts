import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyDTO } from '../../../../data/interfaces/interface-company';

@Component({
  selector: 'app-company-item',
  imports: [],
  templateUrl: './company-item.html',
  styleUrl: './company-item.scss',
})
export class CompanyItem {
  @Input() company!: CompanyDTO;

  constructor(private router: Router) {}

  goToDetail() {
    this.router.navigate(['/detail', this.company.id]);
  }
}
