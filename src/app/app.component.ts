import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputFormComponent } from "./input-form/input-form.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InputFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Currency Converter';
}
