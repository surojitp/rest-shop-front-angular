import { Component,OnInit, OnDestroy} from '@angular/core';
import {CatService} from '../cat.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit,OnDestroy {

  constructor(private c: CatService) { }

  ngOnInit(){
    this.c.headerFalse()
  }

  ngOnDestroy(){
    this.c.headerTrue()
  }

}
