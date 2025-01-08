// input-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ExchangeRatesComponent } from "../exchange-rates/exchange-rates.component";

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ExchangeRatesComponent],
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  inputForm!: FormGroup;
  CurrencyNames: any[] = [];
  exchangeRatesHidden: boolean = true;
  baseCurrencyToSend: string | null = null;
  amountToSend: string | null = null;
  targetCurrencyToSend: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get<any>('assets/CurrencyNames.json').subscribe((data) => {
      this.CurrencyNames = Object.values(data);
    });

    this.inputForm = this.fb.group({
      amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      baseCurrency: ['', Validators.required],
      targetCurrency: ['', Validators.required],
    });
  }

  onSubmit(): void {
    
    if (this.inputForm.valid) {
      const formValues = this.inputForm.value;
      console.log(`Form is valid!\nThe input is ${formValues.amount}, Currency: ${formValues.baseCurrency}, Target Currency to convert to  : ${formValues.targetCurrency}`);

      this.baseCurrencyToSend = formValues.baseCurrency;
      this.amountToSend = formValues.amount;
      this.targetCurrencyToSend = formValues.targetCurrency;

      this.exchangeRatesHidden = false;
    } else {
      alert('Form is not valid');
      this.exchangeRatesHidden = true;
    }
  }
}
