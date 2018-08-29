import { Component, OnInit } from '@angular/core';
import {CatService} from '../../cat.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart;
  total;

  constructor(private service:CatService) { }

  ngOnInit() {

    this.cart= JSON.parse(this.service.getCookie('cart'))
    this.total= this.service.getCookie('total')

   
    

    //console.log(JSON.parse(this.cart))
    console.log(this.total)

  }

  remove_from_cart(product){
    //console.log(product)
    this.service.removeItemCart(product);
    this.cart= JSON.parse(this.service.getCookie('cart'))
    this.total= this.service.getCookie('total')
  }

 

}
