import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';

import { ICompany } from '../../lib/models/company.interface';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-component',
  templateUrl: 'company.component.html',
  styleUrls: ['company.component.scss'],
})
export class CompanyComponent implements OnInit, OnDestroy {
  public companies: ICompany[];

  public destroy$: SubscriptionLike;

  constructor(private _companyService: CompanyService) {}

  public ngOnInit() {
    this.destroy$ = this._companyService.getAllCompanies().subscribe(
      (companies) => {
        this.companies = companies;
      }
    );
  }

  public ngOnDestroy() {
    this.destroy$.unsubscribe();
  }
}
