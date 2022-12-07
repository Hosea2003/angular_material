import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ProductData from '../Models/product.data';
import {catchError, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  saveProduct(data:ProductData){
    return this.http.post<any>("http://localhost:3000/productList/", data);
  }

  getProduct(){
    return this.http.get<ProductData[]>("http://localhost:3000/productList");
  }

  filterProduct(name:string){
    const params=new HttpParams();
    params.append("productName", name);
    return this.http.get<ProductData[]>("http://localhost:3000/productList/", {params:params});
  }
}
