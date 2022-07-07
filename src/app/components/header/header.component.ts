import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  public isLoggedIn: boolean = false;
  supplierName: string = '';
  profId: any
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
    const profileId =  this.authService.profileId// localStorage.getItem('profileId')?.toString();
    this.profId = this.authService.profileId;
    this.supplierName = this.authService.name;

    console.log(this.isLoggedIn)
    // if(this.location.path() != "/authentication")this.item = 'show';
  }


  homepage(){



  }
  collapsed = true;

  signOut(){
    this.authService.signOut();
    this.router.navigate(["/auth"]);
    this.isLoggedIn = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
