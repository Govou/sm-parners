import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BusinessSignUp } from '../model/business-signup';
import { IndividualSignup } from '../model/individual-signup';
import { UserAuth } from '../model/user-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<UserAuth>();
  constructor(private httpClient: HttpClient) { }

  token: string = '';
  profileId: any;
  name: string = '';
  email: string = '';
  loggedIn: boolean = false;
  halobizBaseUrl = environment['halobizBaseUrl'];

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  error = new Subject<string>();

  individualSignupService(request: IndividualSignup){
    return this.httpClient.post<any>(`${this.halobizBaseUrl}/api/SMSAccount/CreateSupplierIndividualAccount`, request)
                          .pipe(map(res => {
                            let result = "";
                            console.log('heyyyyyy')
                            if(res.responseCode =="00")
                            {
                              result = "success"
                            }
                            else{
                            //  result = `failed - ${res.responseData}`
                            if(res.responseMsg){
                              throw new Error(res.responseMsg)
                            }
                            else{
                              throw new Error('A system error occured!')
                            }

                            }
                            return result;
                            }),
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
                            if(res.responseCode == "00"){
                              this.token = res.responseData.token;
                              this.email = res.responseData.email;
                              this.profileId = res.responseData.profileId;
                              this.name = res.responseData.name;
                              this.loggedIn = true
                              localStorage.setItem('isLoggedIn', "true")
                            }
                            return res;
                            })

                          )

  }


  signOut(){
    this.token = '';
    this.email = '';
    this.profileId = null;
    this.name = '';
    this.loggedIn = false;
    localStorage.setItem('isLoggedIn', "false")
  }
}
