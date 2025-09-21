import { Component, OnInit, inject } from '@angular/core';
import { CompanyDTO } from '../../data/interfaces/interface-company';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompanyApiService } from '../../services/company/company-api.service';

@Component({
  selector: 'app-company-detail',
  imports: [CommonModule],
  templateUrl: './company-detail.html',
  styleUrls: ['./company-detail.scss'],
})
export class CompanyDetail implements OnInit {
  company: CompanyDTO | null = null;

  private companyApiService = inject(CompanyApiService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    this.companyApiService.getCompaniesId(id).subscribe((response) => {
      this.company = response;
    });
  }
}
