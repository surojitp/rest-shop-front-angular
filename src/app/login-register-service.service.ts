import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions,ResponseOptions} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CatService} from './cat.service';

import { map,catchError } from "rxjs/operators";
//import {catch} from 'rxjs/add/operator/catch';
//import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterServiceService {

  constructor(private cs:CatService, private http:Http) { }

  register_service(data):Observable<any>{

    const headers = new Headers({'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    // let formdata = new FormData();
    // formdata.append('email', data.email);
    // formdata.append('password', data.password);

    var url = 'http://localhost:3000/user/signup';

    return this.http.post(url,data,
                      new ResponseOptions({
                        headers: headers
                      })
                    )
                    .pipe(
                      map((response: any) => response.json()),
                      //catchError((e: any) => Observable.throw(this.errorHandler(e)))
                      catchError(this.handleError<any>('addHero'))
                    )
                    //.map((response: any) => response.json())
                    //.catch ((e: any) => Observable.throw(this.errorHandler(e)));
  }
    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of (result as T);
    };
  }

 

  errorHandler(error: any): void {
    console.log(error)
  }
}
