import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  href: any;
  constructor(private router: Router) {  }

  ngOnInit(): void {}

  @Input() collapsed = false;
  @Input() screenWidth = 0;
  @Input() sidebar:any;

  isHomeRoute() {
    return this.router.url == '/';
  }

  getBodyClass(): string{
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768){
      styleClass = 'body-trimmed';
    }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass = 'body-md-screen'
    }else if(this.href == '/'){
      styleClass = 'body-full-screen'
    }
    return styleClass;
  }
}
