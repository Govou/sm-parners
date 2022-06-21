import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private location:Location,private router:Router) { }
  item:any;
  userName:any;
  ngOnInit(): void {
    this.item = 'yes'
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

}
