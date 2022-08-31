import { Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private authService: AuthApiService) { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public getToken(): string | null {
    console.log('getting token');
    var token = window.sessionStorage.getItem(TOKEN_KEY);
    console.log('token', token);
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  // public saveRefreshToken(token: string): void {
  //   window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
  //   window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  // }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  }

  public generateToken(): void {
    console.log('generating token')
    this.authService.generateToken().subscribe(res => {
      console.log(res);
      if(res.responseCode == "00"){
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, res.responseData.token)
      }
    })
  }

  public generateRefreshToken(): void {
    this.authService.generateRefreshToken().subscribe(res => {
      if(res.responseCode == "00"){
        window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
        window.sessionStorage.setItem(REFRESHTOKEN_KEY, res.responseData.refreshToken);
      }
    })
  }

}
