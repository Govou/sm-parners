import { Component, OnInit, Output, EventEmitter, HostListener} from '@angular/core';
import { navbarData } from './nav-data';
import { settingsAbout } from './nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter <SideNavToggle> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth
    this.collapsed=true;
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth});
  }

  collapsed = false;
  screenWidth = 0;
  navData =  navbarData;
  settingsabout = settingsAbout;

  @HostListener('window:resize',['$event'])
  onResize(event: any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth});

    }

  }
  toggleCollapsed(): void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth});

  }
  closeSidenav(): void{
    this.collapsed=false
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth});

  }

}
