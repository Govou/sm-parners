import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { personalContact, createBussiness } from 'src/app/model/authentication';
import { Router } from '@angular/router';
import { slideInAnimation, frameAnimation } from 'src/app/animations/app.animation';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { NgToastService } from 'ng-angular-popup';




@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  animations: [
    slideInAnimation, frameAnimation
  ]
})
export class AuthenticationComponent implements OnInit {

  constructor(private router: Router,private endpoint:EndpointsService,private ngxService: NgxUiLoaderService,private toast: NgToastService) { }
  SPINNER = SPINNER
  contact = new personalContact('','','','','',0,0,'','','','','');
  businessContact = new createBussiness('',0,'','',0,0,'','','','','','','','','','');
  passwordPtn = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$'
  page:any
  stateList:any
 stateLis:any
 lgaList:any
 lgaLis:any 
 errorMsg:any;

  ngOnInit(): void {
    this.page='home';
    this.endpoint.getState().subscribe(data =>{this.stateList=data; this.stateLis=this.stateList.responseData})

  }
  getlga(id:any){
    this.endpoint.getlga(id).subscribe(data =>{this.lgaList=data;  this.lgaLis=this.lgaList.responseData})
  }

  supplierName = this.contact.firstName +' '+this.contact.lastName
  createPersonalResponse:any;
  createPersonalResponseData:any;
  createPersonal(){
    this.ngxService.start();
    this.endpoint.createPersonal({supplierName:this.supplierName, description:this.contact.address,supplierCategoryId: 1,
      mobileNumber:this.contact.phoneNumber,stateId:this.contact.stateId, state:this.contact.stateId, lgaId:this.contact.lgaId,
      street:this.contact.address, address:this.contact.address, imageUrl:this.contact.firstName, primaryContactName:this.supplierName,
      primaryContactEmail:this.contact.email, primaryContactMobile:this.contact.phoneNumber, primaryContactGender:this.contact.gender,
      accountLogin:{email:this.contact.email, password:this.contact.password}

    }).subscribe((data) => {console.log(data), this. createPersonalResponse=data;
    if(this.createPersonalResponse.responseCode == '00'){
      this.createPersonalResponseData = this.createPersonalResponse.responseData;
      this.ngxService.stop();
    }
      else{
        this.showWarn(this.createPersonalResponse.responseCode.responseMsg);
        this.ngxService.stop();
      }
    },(error) => {
      this.errorMsg=error
      this.ngxService.stop();
      this.showError(this.errorMsg);
    }) 
  }
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
  
  accountType(){
    this.page='accountType'
  }
  backToHome(){
    this.page='home'
  }
  signInEmail(){
    this.page = 'signInEmail';
  }
  backTosignInEmail(){
    this.page = 'signInEmail';
  }
  signInPassword(){
    this.page='signInPassword'
  }
  getSignInPassword(){
    this.router.navigate(['/dashboard']);
  }

  bizAccount(){
    this.page='bizAccount'
  }
  indAccount(){
    this.page='indAccount'
  }
  backToAccountType(){
    this.page='accountType'
  }

  getPersonalForm(data:any){
    console.warn(data)
    this.page = 'getPersonalAdd'
  }
  backToPersonalForm(){
    this.page='indAccount'
  }
  getPersonalAdd(data:NgForm){
    console.warn(data)
    this.page = 'getPersonalPassword'
  }
  backToPersonalAdd(){
    this.page = 'getPersonalAdd'
  }
  getPersonalPassword(data:any){
    console.log(data);
    this.page = 'otp';
    // this.endpoint.savePersonal({
    //   firstName:this.contact.firstName, lastName:this.contact.lastName, dateOfBirth:this.contact.dateOfBirth,
    //   phoneNumber:this.contact.phoneNumber,gender:this.contact.gender, stateId:this.contact.stateId,lgaId:this.contact.lgaId,
    //   address:this.contact.address,imageUrl:this.contact.imageUrl,accountLogin:{email:this.contact.email, password:this.contact.password} 
    // }).subscribe((result)=>{this.response=result; this.responseP=this.response.responseMsg; console.warn(this.response.responseMsg);

    //   if(this.response.responseMsg =='SUCCESS'){
    //     this.page='email';
    //   }
    //   else{
    //     this.page='createPass';
    //   };
    // });
  
  }
  getCompanyDetail(data:any){
    console.warn(data)
    this.page='bizAddress'
    this.businessContact.industry = data.biztype
  }
  backToCompanyDetail(){
    this.page = 'bizAccount'
  }
  getBusinessAddress(data:NgForm){
    console.warn(data)
    this.page = 'bizContactPaerson'
  }
  backToBusinessAddress(){
    this.page = 'bizAddress'
  }
  getContactPerson(data:NgForm){
    console.warn(data)
    this.page = 'bizPassword'
  }
  backToContactPerson(){
    this.page = 'bizContactPaerson'
  }
  getBusinessPassword(data:any){
    console.log(data);
    this.page= 'otp';
    // this.businessContact.industry = data.biztype;
    // console.warn(data);
    // this.endpoint.createBusiness({companyName:this.businessContact.companyName,industryId:this.businessContact.industryId,industry:this.businessContact.industry,
    //   phoneNumber:this.businessContact.phoneNumber,stateId:this.businessContact.stateId,lgaId:this.businessContact.lgaId,address:this.businessContact.address,
    //   logoUrl:this.businessContact.logoUrl,accountLogin:{email:this.businessContact.email,password:this.businessContact.password},contactPerson:{
    //     firstName:this.businessContact.firstName, lastName:this.businessContact.lastName, dateOfBirth:this.businessContact.dateOfBirth, phoneNumber:this.businessContact.phoneNumber2, gender:this.businessContact.gender
    //   }

    // }).subscribe((result)=>{this.response=result;this.responseB=this.response.responseMsg;  console.warn(this.response.responseCode); 
    //   if(this.response.responseCode =='00'){
    //     this.page='email';
    //   }
    //   else{
    //     this.page='createPassB';
    //   };
    // })
  }

  otpCode:any;
  getOtp(item:any){
    this.otpCode=item.txt1+item.txt2+item.txt3+item.txt4+item.txt5+item.txt6;
    console.warn(this.otpCode);
    this.router.navigate(['/addasset']);
    // this.endpoint.vrifyCode({email:this.contact.email, code:this.otpCode}).
    // subscribe((data) => {this.response1=data;this.responseOtp=this.response1.responseMsg; console.warn(this.response1.responseCode);
    //   if(this.response1.responseCode =='00'){
    //     this.section2 = 'no'
    //     this.page = 'successful';
    //     // this.router.navigate(['/book-trip']);
    //     // this.interaction.sendMessage('show')
    //   }
    //   else{
    //     this.page='email';
    //   };
    // });
  }
  move(e:any,p:any,c:any,n:any){
    var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');
    if(length == maxlength){
      if(n != ''){ n.focus();}}
      if(e.key === 'Backspace'){
        if(p != ''){p.focus();}}
  }
}
