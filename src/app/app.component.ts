import { Component,OnInit } from '@angular/core';
import {CatService} from './cat.service';
import { nodeChildrenAsMap } from '@angular/router/src/utils/tree';
import { ninvoke } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  cat: any[] =[];

  constructor(private c:CatService){
  }

  ngOnInit(){
    this.get_category();
  }
  get_category(){
    this.c.get_category()
          .subscribe((category) => {
            //console.log(category);
            
            let cat_string = category._body;
            //console.log("category",cat_string);
            
            //let cat_obj = JSON.parse(cat_string);
            //console.log("category obj",cat_string);
            
            //this.cat.push(cat_string);

            //console.log(cat_obj.count)

             this.cat = JSON.parse(cat_string);
            // console.log(this.cat);
          })
  }
}


