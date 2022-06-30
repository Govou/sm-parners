import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { DisplayService } from 'src/app/services/display.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  subscription: Subscription = new Subscription();
  public isLoggedIn: boolean = false;

  constructor(private location:Location,private router:Router, private authService: AuthService, private displayService: DisplayService) {
    this.subscription = displayService.newShow.subscribe(
      res => {
          this.isLoggedIn = res;
        })
      }
  item:any;
  userName:any;
  ngOnInit(): void {
    this.item = 'yes'
    if(localStorage.getItem("isLoggedIn") == "true"){
      this.isLoggedIn = true;
    }


    console.log(this.isLoggedIn)
    // if(this.location.path() != "/authentication")this.item = 'show';
  }


  homepage(){

    // if(localStorage.getItem('token')){
    //   this.router.navigate(['/dashboard'])
    //   window.location.reload();
    // }
    // else{
    //   this.router.navigate(['/authentication'])
    //   this.item='yes'
    //   window.location.reload();
    // }

  }
  collapsed = true;

  signOut(){
    this.authService.signOut();
    this.router.navigate(["/auth"]);
    this.isLoggedIn = false;
  }
}
