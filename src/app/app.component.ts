import { Component } from '@angular/core';
import { Router } from '@angular/router'


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'partners';

  constructor(public router: Router){
  }
  isHomeRoute() {
    return this.router.url === '/';
  }

  isauthRouth(){
    return this.router.url === '/authentication';
  }
  
  isSideNavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav( data: SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
