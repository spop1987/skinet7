import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {

  product?: Product;
  quantity = 1;
  quantityInBasket = 0;

  constructor(private shopServie: ShopService, private activatedRoute: ActivatedRoute, private bcService: BreadcrumbService)
  {
    this.bcService.set('@productDetails', '');
  }


  ngOnInit(): void {
    this.loadProduct();
  }
  
  loadProduct(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id) this.shopServie.getProduct(+id).subscribe(
      {
        next: product => {
          this.product = product;
          this.bcService.set('@productDetails', product.name);
        },
        error: error => console.log(error)
      }
    );
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    this.quantity--;
  }

  updateBasket() {
    if (this.product) {
      if (this.quantity > this.quantityInBasket) {
        const itemsToAdd = this.quantity - this.quantityInBasket;
        this.quantityInBasket += itemsToAdd;
        //this.basketService.addItemToBasket(this.product, itemsToAdd);
      } else {
        const itemsToRemove = this.quantityInBasket - this.quantity;
        this.quantityInBasket -= itemsToRemove;
        //this.basketService.removeItemFromBasket(this.product.id, itemsToRemove);
      }
    }
  }

  get buttonText() {
    return this.quantityInBasket === 0 ? 'Add to basket' : 'Update basket';
  }

}
