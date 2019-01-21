import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICompany } from '../../lib/models/company.interface';

@Injectable({
  providedIn: 'root'
})

export class CompaniesService {
  constructor(private _httpClient: HttpClient) { }

  public getAllCompanies(): Observable<ICompany[]> {
    return this._httpClient.get<ICompany[]>('http://localhost:3000/companies');
  }
}