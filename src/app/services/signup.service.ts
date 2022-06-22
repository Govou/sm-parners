import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IndividualSignup } from '../model/individual-signup';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }

  halobizBaseUrl = environment['halobizBaseUrl']

  individualSignupService(request: IndividualSignup){
    return this.httpClient.post<any>(`${this.halobizBaseUrl}/api/SMSAccount/CreateSupplierIndividualAccount`, request)
                          .pipe(map(res => {
                            let result = "";
                            if(res.responseCode =="00")
                            {
                              result = "success"
                            }
                            else{
                              result = `failed - ${res.responseData}`
                            }
                            return result;
                            })
                          )

  }

  businessSignupService(request: IndividualSignup){
    return this.httpClient.post<any>(`${this.halobizBaseUrl}/api/SMSAccount/CreateSupplierBusinessAccount`, request)
                          .pipe(map(res => {
                            let result = "";
                            if(res.responseCode =="00")
                            {
                              result = "success"
                            }
                            else{
                              result = `failed - ${res.responseData}`
                            }
                            return result;
                            })
                          )

  }
}
