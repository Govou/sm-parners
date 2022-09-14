import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,private toast: NgToastService, private toastr: ToastrService) { }

  showSuccess(message: any) {
    this.toast.success({ detail: "SUCCESS", summary: message, duration: 5000 });
  }
  showError(message:any) {
    this.toast.error({ detail: "ERROR", summary: message, duration: 5000 });
  }
  showInfo(message: any) {
    this.toast.info({ detail: "INFO", summary: message, duration: 5000 });
  }
  showWarn(message:any) {
    this.toast.warning({detail:"WARN",summary:message,duration:5000});
  }
  ngOnInit(): void {
  }


  addNewAsset(){
    this.router.navigate(['/addasset']);
  }
  serviceCenter(){
    this.router.navigate(['/servicecenters']);
  }
  assetReview(){
    this.router.navigate(['/assetreview']);
  }
  assetManaged(){
    this.router.navigate(['/asset']);
  }
showMessage(){
  this.showInfo('page not available'),
  this.toastr.error('System error', 'A system error has occured', {
    timeOut: 3000,
  });
  console.log('show alert')
}

}
