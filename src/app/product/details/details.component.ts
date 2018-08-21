import { Component, OnInit } from '@angular/core';
import {CatService} from '../../cat.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

import '../../../assets/themes/js/common.js';
import '../../../assets/themes/js/custom.js';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  
})
export class DetailsComponent implements OnInit {

  routeSub;
  productId;

  productDetails = [];
  color = "";

  constructor(private cats: CatService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {

    

    this.routeSub = this.activateRoute.params.subscribe(p =>{

      if(p["productId"]){
        this.productId = p["productId"];
        this.get_product_details(this.productId);
      }
    })
    console.log('product',this.productId);
  }

  get_product_details(pId){
    this.cats.get_product_details(pId).subscribe(data =>{
      
      let dataparse = JSON.parse(data._body);
     
      this.productDetails = dataparse.product;

      //console.log(JSON.parse(dataparse.product.color));

      let clr = JSON.parse(dataparse.product.color);

      for(var i=0;i<clr.length;i++){
        this.color += clr[i];
        if(i != (clr.length-1)){
          this.color +=",";
        }
      }

      //console.log(this.color)

      
    })
  }

}


  

