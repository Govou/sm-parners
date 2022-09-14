import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { DisplayService } from 'src/app/services/display.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  public isLoggedIn: boolean = false;
  profId: any;
  constructor(private location:Location,private router:Router, private authService: AuthService, private toastr: ToastrService, private displayService: DisplayService) {
    this.subscription = displayService.newShow.subscribe(
      res => {
          this.isLoggedIn = res;
        }, (err: any) => {
          this.toastr.error('System error', 'A system error has occured', {
            timeOut: 3000,
          });
        })
      }
  item:any;
  userName:any;

  get supplierName(): string {
    return this.authService.profileName;
}

get profileId(): string {
  return this.authService.profileId;
}

  ngOnInit(): void {
    this.item = 'yes'
    this.profId =  this.profileId;
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
