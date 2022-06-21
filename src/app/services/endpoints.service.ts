import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { timeout } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EndpointsService {
  baseUrl = 'https://dev-online-backend.azurewebsites.net/'
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error")
  }
  constructor(private http: HttpClient) { }

  getState() {
    return this.http.get(`${this.baseUrl}api/Utilities/GetStates`).pipe(catchError(this.errorHandler), timeout(30000))
  }
  getlga(id: number) {
    return this.http.get(this.baseUrl + 'api/Utilities/GetLocalGovtAreas?stateId=' + id).pipe(catchError(this.errorHandler), timeout(30000))
  }
  createPersonal(data:any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/SMSAccount/CreateSupplierAccount', data).pipe(catchError(this.errorHandler), timeout(30000))
  }
}
