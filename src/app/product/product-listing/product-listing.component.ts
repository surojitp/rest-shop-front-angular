import { Component, OnInit } from '@angular/core';
import {CatService} from '../../cat.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { log } from 'util';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  routeSub;
  categoryId = null;
  subCategoryId = null;
  productData = [];

  constructor(private cats: CatService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    //this.get_product_by_category_id();
    // var categoryid = +this.activateRoute.snapshot.paramMap.get("categoryid");

    // console.log("cat"+ categoryid.toString())

    this.routeSub = this.activateRoute.params.subscribe(params => {

      console.log(params);
      
      //this.storeLocation = +params['storeLocation'];
      if(typeof params['categoryid'] !== 'undefined'){
        console.log('category >> ',params['categoryid']);
        this.categoryId = params['categoryid'];
        this.get_product_by_category_id(this.categoryId)
      }

      if(typeof params['subcategoryId'] !== 'undefined'){
        console.log('sub category >> ',params['subcategoryId']);
        this.subCategoryId = params['subcategoryId'];
        this.get_product_by_subCategory(this.subCategoryId);
      }

      
      
      
    })
    console.log("sss",this.categoryId);
    if(this.categoryId){
      this.get_product_by_category_id(this.categoryId);
    }
    else{
      //alert()
      this.get_product_by_subCategory(this.subCategoryId);
    }
    
    
  }

  get_product_by_category_id(categoryid){
    //this.productData = [];
    //const categoryid = this.activateRoute.snapshot.queryParamMap["categoryid"];

    //console.log("cat"+categoryid)
    this.cats.get_product_by_category_id(categoryid)
              .subscribe(data =>{
                console.log(data)   
                var data_body = data._body

                var parse_body = JSON.parse(data_body)

                

                if(parse_body){
                  //alert()
                  let data_pro = parse_body.data.product

                  console.log(data_pro)
                  this.productData = data_pro
                //console.log(this.productData)
                }
                else{
                  this.productData = [];
                }
                
              },(error)=>{

                this.productData = [];

              })
    ;
  }

  get_product_by_subCategory(subCategoryId){
              
    console.log('sub',subCategoryId);
    
    this.cats.get_product_by_subCategory(subCategoryId)
                        .subscribe((data:any) =>{

                          console.log(data)
                          var data_body = data._body;

                          var parse_body = JSON.parse(data_body)
                          if(parse_body){
                            this.productData = parse_body.product
                            console.log(this.productData)
                          }
                          else{
                            this.productData = [];
                          }
                          
                        });
                      
  }

}
