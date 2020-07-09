import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable,EMPTY } from "rxjs";
import { Product } from './product.model';

import { map,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/produtos";

  constructor(
  	private snackBar : MatSnackBar,
  	private http : HttpClient	
  	){ }

//MENSAGENS
  showMessage(msg:string,isError:boolean=false):void{

  	this.snackBar.open(msg,'x',{

  		duration:3000,
  		horizontalPosition:"right",
  		verticalPosition:"top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
  	});

  }
//TRATAMENTO DO ERRO
  errorHandler(e:any) : Observable<any>{

      console.log(e)//é um objeto que retorna varios detalhes sobre o erro e escolhi o statusText
      this.showMessage( 'Ocorreu um Erro! '+ e.statusText,true);
      return EMPTY;
   }

//CREATE   
  create(product:Product) : Observable<Product>{

  	return this.http.post<Product>(this.baseUrl,product).pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );

  }
//READ
  read() : Observable<Product[]>{

  	return this.http.get<Product[]>(this.baseUrl).pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  
  }
//READBYID
  readById(id:number) : Observable<Product>{

  	const url = `${this.baseUrl}/${id}`;
  	return this.http.get<Product>(url).pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );

  }
//UPDATE
  update(product: Product) : Observable<Product>{

  	const url = `${this.baseUrl}/${product.id}`;
  	return this.http.put<Product>(url,product).pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );

  }
//DELETE
  delete(id:number) : Observable<Product>{
    const url = `${this.baseUrl}/${id}`; 
    return this.http.delete<Product>(url).pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  }

}
