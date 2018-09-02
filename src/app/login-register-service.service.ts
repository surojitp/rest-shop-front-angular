import { Injectable,EventEmitter,Output } from '@angular/core';
import {Http,Headers,RequestOptions,ResponseOptions} from '@angular/http';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import {Observable, of} from 'rxjs';

import {CatService} from './cat.service';

import { map,catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginRegisterServiceService {

  @Output() loginLogoutChange: EventEmitter<any> = new EventEmitter();

  @Output() loginStatus: EventEmitter<any> = new EventEmitter();

  private statusSource = new BehaviorSubject(false);
  
  currentLoginStatus = this.statusSource.asObservable();

  constructor(private cs:CatService, private http:Http) { }

  changeLoginStausFunction(status: boolean){

    this.statusSource.next(status);
  }

  login_service(data):Observable<any>{

    const headers = new Headers({'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    var url = 'http://localhost:3000/user/login';

    return this.http.post(url,data,
                            new ResponseOptions({
                              headers: headers
                            })
                          )
                          .pipe(
                            map((response: any) => {

                              if(response){
                                
                                this.loginLogoutChange.emit('<a href="#" (click)="LogOut()">LogOut</a>');
                                this.loginStatus.emit(true);

                                return response.json();
                              }
                              
                            }),
                            //catchError((e: any) => Observable.throw(this.errorHandler(e)))
                            catchError(this.handleError('login',url))
                          )


  }

  logout_service(){
    this.cs.deleteCookie('userLogin');
    this.loginStatus.emit(false);
  }

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
                      catchError(this.handleError('regiuster',url))
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
  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
 
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
 
  //     // TODO: better job of transforming error for user consumption
  //     console.log(`${operation} failed: ${error.message}`);
 
  //     // Let the app keep running by returning an empty result.
  //     return of (result as T);
  //   };
  // }

  private handleError(operation: String,url=null) {
        return (err: any) => {
            let errMsg = `error in ${operation}() retrieving ${url}`;
            //console.log(`${errMsg}:`, err)
            if(err instanceof HttpErrorResponse) {
                // you could extract more info about the error if you want, e.g.:
                console.log(`status: ${err.status}, ${err.statusText}`);
                // errMsg = ...
            }
            //return Observable.throw(errMsg);
            return throwError(errMsg);
        }
  }

 

  errorHandler(error: any): void {
    console.log(error)
  }

  order(data){
    console.log('ddddd',data.token)
    const headers = new Headers({'Content-Type': 'application/json','Authorization': 'Barer '+data.token});
    //headers.append('Authorization', 'Barer '+data.token)
    const options = new RequestOptions({ headers: headers });

    var url = 'http://localhost:3000/orders';

    console.log('header',headers);

    return this.http.get(url,
                            new ResponseOptions({
                              headers: headers
                            })
                          )
                          .pipe(
                            map((response: any) => response.json()),
                            //catchError((e: any) => Observable.throw(this.errorHandler(e)))
                            catchError(this.handleError('order',url))
                          )
  }
}
