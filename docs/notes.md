# Things I've learned

## Reactive Forms in Angular 19

In Angular 19, **Reactive Forms** are a way to build and manage forms in a more structured and flexible manner. They are created using **FormControl** and **FormGroup** to track form values and validation.

- **FormControl** represents a single form field.
- **FormGroup** groups multiple FormControls together.

Reactive forms are more code-driven, meaning you define the form structure and validation rules in your TypeScript code, not in the HTML. This approach offers more control over form behavior, validation, and state.


## Static Assets Management

**Assets in Angular** refers to static files (like images, fonts, and JSON files) that are stored in the `assets` folder. These files are served directly by the Angular application without being processed or changed, making it easy to access them during development and in production.


## CommonModule

Exports all the basic Angular directives and pipes, such as NgIf, NgForOf, DecimalPipe, and so on. Re-exported by BrowserModule, which is included automatically in the root AppModule when you create a new app with the CLI new command.



## Parent-to_Child Communication
In Angular 19, **Parent-to-Child Communication** is a way for a **parent component** to pass data to a **child component** using the `@Input()` decorator. 

Here's how it works:

1. **Parent Component** holds the data (e.g., form values).
2. The parent passes this data to the **child component** by binding it to child component properties in the parent's template.
3. **Child Component** receives the data and displays or uses it.




This is done through **property binding** in the parent's HTML and **`@Input()`** in the child's TypeScript.

**Example:**
- Parent (`InputFormComponent`) binds values to `amount` and `currency`.
- Child (`ExchangeRatesComponent`) receives those values using `@Input()` and displays them.

So, the data flows **from the parent to the child**, and Angular takes care of the communication.



### type casting
1. **Type Safety with `amount`**: 
   - The expression `+amount` will convert the `amount` from a string to a number (using the unary `+` operator). If `amount` is `null`, the default value `0` is used (via the conditional `(amount ? +amount : 0)`).
   
2. **Error Handling**: 
   - The multiplication result is wrapped in an expression to handle the case when `amount` or `exchangeRates['conversion_rates'][targetCurrency]` is invalid (or `null`). If it's invalid, it shows `'Invalid amount'` instead of an error.

With these changes, your code should now correctly handle the `amount` and avoid the type errors.