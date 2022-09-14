import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthAPIResponse } from '../model/dtos/auth-api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }
  halobizBaseUrl = environment['halobizBaseUrl'];
  halobizUsername = environment['halobizUsername'];
  halobizPassword = environment['halobizPassword'];
  refreshToken = '';
  token = '';

  generateToken(){
     return this.httpClient.get<AuthAPIResponse>(`${this.halobizBaseUrl}/api/Auth/GenerateToken`, { params: new HttpParams()
                                                                                              .set('email', this.halobizUsername)
                                                                                              .set('password', this.halobizPassword)})
                          .pipe(map(res => {
                             var result = res;
                             console.log('gen token', res);
                             if(result.responseCode == "00"){
                              this.refreshToken = res.responseData.refreshToken;
                              this.token = res.responseData.token;
                             }
                             else{
                              this.toastr.error('System error', 'A system error has occured', {
                                timeOut: 3000,
                              });
                             }
                              console.log(result);
                              return result;
                            })
                          )

  }


  generateRefreshToken(){
    return this.httpClient.get<AuthAPIResponse>(`${this.halobizBaseUrl}/api/Auth/GenerateTokenFromRefreshToken`,{ params: new HttpParams()
                                                                                                                .set('email', this.halobizUsername)
                                                                                                                .set('refreshToken', this.refreshToken)})
                          .pipe(map(res => {
                            var result = res;
                            if(result.responseCode == "00"){
                             this.refreshToken = res.responseData.refreshToken;
                             this.token = res.responseData.token;
                            }
                            else{
                              this.toastr.error('System error', 'A system error has occured', {
                                timeOut: 3000,
                              });
                            }
                             console.log(result);
                             return result;
                           })
                          )

  }

}
