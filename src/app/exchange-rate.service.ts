import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  private apiUrl = 'http://localhost:8000/api/get-exchange-rates';

  constructor(private http: HttpClient) { }

  getExchangeRates(baseCurrency: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?baseCurrency=${baseCurrency}`);
  }
}
