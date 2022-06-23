import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BusinessSignUp } from '../model/business-signup';
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

  businessSignupService(request: BusinessSignUp){
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


  verifyCode(request: {email: string, code: string}){
    return this.httpClient.post<any>(`${this.halobizBaseUrl}/api/SMSAuth/VerifyCode`, request)
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

  signIn(request: {email: string, password: string}){
    return this.httpClient.post<any>(`${this.halobizBaseUrl}/api/SMSAuth/SupplierLogin`, request)
                          .pipe(map(res => {
                            console.log(res);
                            return res;
                            })
                          )

  }

}
