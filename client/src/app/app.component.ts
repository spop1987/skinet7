import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './Shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SkiNet';
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/products?pagesize=50').subscribe({
      next: (response: any) => this.products = response.data, // what to do next?
      error: error => console.log(error),
      complete: () => {
        console.log('request completed');
        console.log('extra statement');
      }
    })
  }
}
