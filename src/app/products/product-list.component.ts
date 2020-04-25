import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html' ,
    styleUrls:['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    _listFilter: string;
    filteredProducts: IProduct[];
    products: IProduct[];
    errorMessage: string;
    constructor(private _productService: ProductService){}
    
    get listFilter(): string {
      return this._listFilter;
    }

    set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducts = this._listFilter ? this.performFilter(this._listFilter) : this.products;
    }

    performFilter(filterBy: string): IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product : IProduct) =>
              product.productName.toLocaleLowerCase().indexOf(filterBy) != -1);
    }

    toggleImage(): void{
      this.showImage = ! this.showImage;
    }

    onRatingClicked(message: string): void {
      this.pageTitle = 'Product List: ' + message;
    }

    ngOnInit(): void {
      this._productService.getProducts().subscribe({
        next: products => {
          this.products = products
          this.filteredProducts = this.products;
        },
        error: err => this.errorMessage = err
      });
    }
}