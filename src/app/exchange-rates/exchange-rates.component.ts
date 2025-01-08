import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ExchangeRateService } from '../exchange-rate.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';

// Define interfaces for API response
interface ConversionRates {
  [currencyCode: string]: number;
}

interface ExchangeRatesResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: ConversionRates; 
}

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.css'],
  imports: [ NgIf, NgFor, CommonModule]
})
export class ExchangeRatesComponent implements OnInit, OnChanges {
  @Input() amount: string | null = null;
  @Input() baseCurrency: string | null = null;
  @Input() targetCurrency: string = "";

  exchangeRates: ExchangeRatesResponse | null = null;
  loading: boolean = false;
  Rates: ConversionRates | null = null;

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {
    if (this.baseCurrency && this.amount) {
      this.fetchExchangeRates(this.baseCurrency);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['baseCurrency'] || changes['amount']) {
      if (this.baseCurrency && this.amount) {
        this.fetchExchangeRates(this.baseCurrency);
      }
    }
  }

  async fetchExchangeRates(baseCurrency: string): Promise<void> {
    this.loading = true;
    try {
      const response = await firstValueFrom(this.exchangeRateService.getExchangeRates(baseCurrency));
      this.exchangeRates = response as ExchangeRatesResponse;
      this.Rates = this.exchangeRates.conversion_rates;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    } finally {
      this.loading = false;
    }
  }
}
