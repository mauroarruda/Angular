import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'
import { ProductService } from '../product.service'
import { Product } from '../product.model'

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

	product:Product;

	constructor(
		private router:Router,
		private route : ActivatedRoute,
		private productService: ProductService
		) { }

	ngOnInit(): void {

		const id = +this.route.snapshot.paramMap.get('id');/*esse + na frente converte pra number*/
		this.productService.readById(id).subscribe(product =>{
			this.product = product;
		});
	}

	deleteProduct() : void{
		this.productService.delete(this.product.id).subscribe(()=>{
			this.productService.showMessage('Produto Excluído Com Sucesso!');
			this.router.navigate(['/products']);

		});
	}

    cancel():void{
   	 	this.router.navigate(['/products']);
    }
}
