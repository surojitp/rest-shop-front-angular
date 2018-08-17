import { Component, OnInit } from '@angular/core';
import {CatService} from '../cat.service';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {

  categorys = [];
  constructor(private categoryService: CatService) { }

  ngOnInit() {
    this.get_category_with_sub_category()
  }

  get_category_with_sub_category(){
    this.categoryService.get_category_with_sub_category()
                        
                        .subscribe(cat =>{

                          //console.log(cat._body)
                          // let cat_string = JSON.stringify(cat._body)

                          // let category_object = JSON.parse(cat_string)
                          // this.categorys = category_object.category

                          // console.log(this.categorys)

                          this.categorys = JSON.parse(cat._body)
                          //console.log(this.categorys)
                        })
  }

}
