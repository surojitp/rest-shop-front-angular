import { Injectable } from '@angular/core';

import {Router,RouterEvent, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators'

import {PlatformLocation } from '@angular/common';

@Injectable()
export class RouterExtServiceService {
  private history = [];

  baseUrl;

  constructor(
    private router: Router,
    platformLocation: PlatformLocation
  ) {
    // console.log((platformLocation as any).location);
    // console.log((platformLocation as any).location.href);
    // console.log((platformLocation as any).location.origin);

    var url = (platformLocation as any).location.href;

    this.baseUrl = url.substr(0, url.length - 1);
  }

  public loadRouting(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({urlAfterRedirects}: NavigationEnd) => {
        this.history = [...this.history, urlAfterRedirects];
      });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(): string {
    
    return this.history[this.history.length - 2] || '/';
  }
}