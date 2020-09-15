import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { map, retry, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  public getRandomProducts(){
    return this.httpClient.get
    (environment.apiUrl)
    .pipe(
      map(
        result => {
          return result['data'];
        }          
      ),
      retry(3),
      catchError(this.handleError)
    );
  }

  public getProduct(id: number){
    return this.httpClient.get
    (environment.apiUrl)
    .pipe(
      map(
        result => {
          return result['data'][id - 1];
        }          
      ),
      retry(3),
      catchError(this.handleError)
    );
  }
}
