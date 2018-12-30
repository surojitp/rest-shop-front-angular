// import {HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';

// export class ShopInterceptorService implements HttpInterceptor{

//   intercept(req: HttpRequest<any>, next: HttpHandler){

//     const newRequest = req.clone({
      
//       // headers: req.headers.set(
//       //   'Authorization', 'Barer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1Ymhhc2hAZ21haWwuY29tIiwidXNlcklkIjoiNWI4YmVlMjNhOTVlMTUyMmY0MmU1NzM1IiwiaWF0IjoxNTM2MTU4MjQwLCJleHAiOjE1MzYxNjE4NDB9.SKTJTqGg2YyH9uSy6BawMGzPR1hJXV1PBezDaahmKPU'
        
//       // )
//       setHeaders: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Barer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvY2tzdXJvMDA3QGdtYWlsLmNvbSIsInVzZXJJZCI6IjViODU3OGQ2MmUxNzY2MjU0Y2YyZDA5YyIsImlhdCI6MTUzNzAwMzE4MiwiZXhwIjoxNTM3MDA2NzgyfQ.X6gvlL3KVaLHZYsHNonvdyqCVdkrmw4Lr5HtetEV4M0'
//       }
//     })

//     console.log(newRequest)
//     //console.log(newRequest.body)

//     return next.handle(newRequest);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';

import { Observable,pipe } from 'rxjs';


// operators all come from `rxjs/operators`
import { map, takeUntil, tap } from 'rxjs/operators';

 @Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


    var hostname = (new URL(req.url)).hostname;


  

//        let headers = req.headers
//         .set('Content-Type', 'application/json')
//         .set('x-access-token', `access token`);
// console.log('headers headers',headers);

//       var cloneReq = req.clone({ headers });

 

//     return next.handle(cloneReq);

    return next.handle(req).pipe(tap(evt => {
      if (evt instanceof HttpResponse) {
        console.log('---> status:', evt.status);
        console.log('---> filter:', req.params.get('filter'));
      }
    })
    );


  }
}