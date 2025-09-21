import { Injectable } from '@angular/core';
import { CompanyDTO } from '../../data/interfaces/interface-company';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyStoreService {
  private companiesSubject = new BehaviorSubject<CompanyDTO[]>([]);
  public companies$ = this.companiesSubject.asObservable();

  setCompanies(companies: CompanyDTO[]): void {
    this.companiesSubject.next(companies);
  }

  private industrieSubject = new BehaviorSubject<string[]>([]);
  public industries$ = this.industrieSubject.asObservable();

  setIndustries(industries: string[]): void {
    this.industrieSubject.next(industries);
  }

  private typesSubject = new BehaviorSubject<string[]>([]);
  public types$ = this.typesSubject.asObservable();

  setTypes(types: string[]): void {
    this.typesSubject.next(types);
  }
}
