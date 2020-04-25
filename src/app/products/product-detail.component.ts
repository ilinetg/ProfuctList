import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute ,Router} from '@angular/router';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;

  constructor(private productService: ProductService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this.productService.getProduct(id).subscribe({
      next: prod => {
        this.product = prod;
        console.log(prod);
      },
    });
  }

  onBack(): void{
    this.router.navigate(['/products']);
  }

}
