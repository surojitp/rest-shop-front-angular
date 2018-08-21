import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(private http:Http) { }

  get_category():Observable<any>{
    let url = 'http://localhost:3000/category';

    return this.http.get(url);
  }

  get_category_with_sub_category():Observable<any>{

    let url = 'http://localhost:3000/category/categryWithSub';

    return this.http.get(url);

  }

  get_product_by_category_id(categoryId):Observable<any>{

    let url = 'http://localhost:3000/products/byCategory/'+categoryId;

    return this.http.get(url);

  }

  get_product_by_subCategory(subCategoryId):Observable<any>{
    let url = 'http://localhost:3000/products/bySubCategory/'+subCategoryId;

    return this.http.get(url);
  }

  get_product_details(productId):Observable<any>{
    let url = `http://localhost:3000/products/${productId}`;
    return this.http.get(url);
  }
}
