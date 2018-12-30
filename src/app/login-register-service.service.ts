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

    const headers = new Headers({
                                "Access-Control-Allow-Origin": "*",
                                'Access-Control-Allow-Headers': "*",
                                "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
                                'Content-Type': 'application/json' 
                              });
    const options = new RequestOptions({ headers: headers });

    var url = 'https://shopbackend.herokuapp.com/user/login';

    return this.http.post(url,data,
                            new ResponseOptions({
                              headers: headers
                            })
                          )
                          .pipe(
                            map((response: any) => {

                              if(response){
                                
                                
                                let userLoginData = {
                                  "id": response.json().userId,   
                                  "email": response.json().email,
                                  "token": response.json().token
                                }
                                
                                this.cs.setCookie('userLogin',JSON.stringify(userLoginData),1);
                                
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
    this.cs.setCookie('userLogin',"",1);
    this.cs.deleteCookie('userLogin');
    this.loginStatus.emit(false);
    this.cs.set_login_data();
  }

  register_service(data):Observable<any>{

    const headers = new Headers({
                                "Access-Control-Allow-Origin": "*",
                                'Access-Control-Allow-Headers': "*",
                                "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
                                'Content-Type': 'application/json' 
                              });
    const options = new RequestOptions({ headers: headers });

    // let formdata = new FormData();
    // formdata.append('email', data.email);
    // formdata.append('password', data.password);

    var url = 'https://shopbackend.herokuapp.com/user/signup';

    return this.http.post(url,data
                      // ,
                      // new ResponseOptions({
                      //   headers: headers
                      // })
                    )
                    .pipe(
                      map((response: any) => {
                        console.log(response);
                        
                        let registerStatus: number;
                        let res = response.json();

                        if(res.message === "User created"){
                          registerStatus = 1;
                        }
                        else if(res.message === "Email already use"){
                          registerStatus = 2;
                        }
                        else{
                          registerStatus = 3;
                        }
                        
                        return registerStatus;
                      }),
                      //catchError((e: any) => Observable.throw(this.errorHandler(e)))
                      //catchError(this.handleError('regiuster',url))
                      catchError(this.handleError2)
                    )
                    //.map((response: any) => response.json())
                    //.catch ((e: any) => Observable.throw(this.errorHandler(e)));

                    // return this.http.post(url,data,options);
                    //   //                 )
  }


  handleError2(error) {
    
    console.log("eeee"+error);
    
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `ErrorCode: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(error);
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
    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Headers': "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
      'Content-Type': 'application/json',
      'Authorization': 'Barer '+data.token,

    });
    //headers.append('Authorization', 'Barer '+data.token)
    const options = new RequestOptions({ headers: headers });

    var url = 'https://shopbackend.herokuapp.com/orders';

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
