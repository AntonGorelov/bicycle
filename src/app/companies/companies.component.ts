import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';

import { ICompany } from '../../lib/models/company.interface';
import { CompaniesService } from './companies.service';

@Component({
  templateUrl: 'companies.component.html',
  styleUrls: ['companies.component.scss'],
})
export class CompaniesComponent implements OnInit, OnDestroy {
  public companies: ICompany[];

  private _destroy$: SubscriptionLike;

  constructor(private _companyService: CompaniesService) {}

  public ngOnInit() {
    this._destroy$ = this._companyService
      .getAllCompanies()
      .subscribe(companies => {
        this.companies = companies;
      });
  }

  public ngOnDestroy() {
    this._destroy$.unsubscribe();
  }
}
