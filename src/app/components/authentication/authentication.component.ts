import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { slideInAnimation, frameAnimation } from 'src/app/animations/app.animation';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { NgToastService } from 'ng-angular-popup';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { IndividualAddress, IndividualDetails } from 'src/app/model/individual-account-registration';
import { AccountLogin, IndividualSignup } from 'src/app/model/individual-signup';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessContact, BusinessCred, BusinessDetail, BusinessLocation } from 'src/app/model/business-account-registration';
import { BusinessSignUp } from 'src/app/model/business-signup';
import { NgxSpinnerService } from "ngx-spinner";
import { coerceStringArray } from '@angular/cdk/coercion';
import { DisplayService } from 'src/app/services/display.service';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/services/token.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  animations: [
    slideInAnimation, frameAnimation
  ]
})
export class AuthenticationComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
    private endpoint:EndpointsService,
    private toast: NgToastService,
    private utilitiesService: UtilitiesService,
    private signupService: AuthService,
    private spinnerService: NgxSpinnerService,
    private displayService: DisplayService,
    private toasters: ToastrService,
    private ngxService: NgxUiLoaderService,
    private tokenService: TokenStorageService,
    private toastr: ToastrService,
    private authService: AuthService
    ) { }


  SPINNER = SPINNER
  passwordPtn = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$'
  page:any
  errorMsg:any;

  email: string = '';
  signInFailed: boolean = false;

  states: {stateName: string, stateId: number}[] = [];
  lgas: {lgaName: string, lgaId: number, stateId: number}[] = [];
  businessTypes: {id: number, name: string}[] = [];

  individualRegistrationForm!: FormGroup;
  individualRegistrationForm_Location!: FormGroup;
  individualRegistrationForm_Credential!: FormGroup;
  businessRegistrationForm!: FormGroup;
  businessRegistrationForm_Location!: FormGroup;
  businessRegistrationForm_ContactPerson!: FormGroup;
  businessRegistrationForm_Credential!: FormGroup;
  otpForm!: FormGroup;
  signInForm!: FormGroup;
  signInFormPassword!: FormGroup;

  error = null;

  ngOnInit(): void {
    this.authService.signOut();
    this.page='home';

     this.utilitiesService.getStates().subscribe(res => {
      this.states = res;
    });

    this.utilitiesService.getBusinessTypes().subscribe(res => {
      this.businessTypes = res;
    }, (err: any) => {
      this.toastr.error('System error', 'A system error has occured', {
        timeOut: 3000,
      });
    });

    this.individualRegistrationForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'dateofbirth': new FormControl(null, Validators.required),
      'phone': new FormControl(null, [Validators.required, Validators.minLength(9)]),
      'gender': new FormControl(null, Validators.required)
    });

    this.individualRegistrationForm_Location = new FormGroup({
      'state': new FormControl(null, Validators.required),
      'lga': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required)
    });

    this.individualRegistrationForm_Credential = new FormGroup({
      'password1': new FormControl(null, [Validators.required]),
    });

    this.businessRegistrationForm = new FormGroup({
      'company': new FormControl(null, Validators.required),
      'biztype': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required)
    });

    this.businessRegistrationForm_Location = new FormGroup({
      'state': new FormControl(null, Validators.required),
      'lga': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required)
    });

    this.businessRegistrationForm_ContactPerson = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'dob': new FormControl(null, Validators.required),
      'gender': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required)
    });

    this.businessRegistrationForm_Credential = new FormGroup({
      'password1': new FormControl(null, Validators.required),
      'password2': new FormControl(null, Validators.required)
    });

    this.otpForm = new FormGroup({
      'txt1': new FormControl(null, Validators.required),
      'txt2': new FormControl(null, Validators.required),
      'txt3': new FormControl(null, Validators.required),
      'txt4': new FormControl(null, Validators.required),
      'txt5': new FormControl(null, Validators.required),
      'txt6': new FormControl(null, Validators.required)
    });

    this.signInForm = new FormGroup({
      'email': new FormControl(null, Validators.required)
    });

    this.signInFormPassword = new FormGroup({
      'password': new FormControl(null, Validators.required)
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

  getPersonalForm(){
    this.page = 'getPersonalAdd'
  }
  backToPersonalForm(){
    this.page='indAccount'
  }
  getPersonalAdd(){
    this.page = 'getPersonalPassword'
  }
  backToPersonalAdd(){
    this.page = 'getPersonalAdd'
  }

  getCompanyAdrress(){
    this.page = 'bizAddress'
  }
  backToCompanyDetail(){
    this.page = 'bizAccount'
  }
  getBusinessAddress(){
    this.page = 'bizContactPaerson'
  }
  backToBusinessAddress(){
    this.page = 'bizAddress'
  }
  getContactPerson(){
    this.page = 'bizContactPaerson'
  }
  backToContactPerson(){
    this.page = 'bizContactPaerson'
  }
  getBusinessPassword(){
    this.page = 'bizPassword'
  }

  successful(){
    // this.section2 = 'yes'
    this.page='signInEmail'
  }
  otpCode:any;
  getOtp(item:any){
    this.otpCode=item.txt1+item.txt2+item.txt3+item.txt4+item.txt5+item.txt6;
    console.warn(this.otpCode);
    this.page = 'successful';
    // this.router.navigate(['/addasset']);
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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///                                                                                                                           ///
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


fetchLGAs(state: string){
  let stateId = Number.parseInt(state);
  this.utilitiesService.getLGAs(stateId).subscribe(res =>{
    this.lgas = res
  }, (err: any) => {
    this.toastr.error('System error', 'A system error has occured', {
      timeOut: 3000,
    });
  })
}

onSubmitIndividualAccoutCreation(){
  this.ngxService.start();
  const indDetail: IndividualDetails = this.individualRegistrationForm.value;
  const indAdrress: IndividualAddress = this.individualRegistrationForm_Location.value;
  const indCred: {password1: string, password2: string} = this.individualRegistrationForm_Credential.value;

  const address = '';
  const stateName = '';
  const supplierCategoryId = 1;

  let signUpCred: AccountLogin = {
    email: indDetail.email,
    password: indCred.password1
  };

  let signUp: IndividualSignup = {
    firstName: indDetail.firstname,
    lastName: indDetail.lastname,
    gender: indDetail.gender,
    supplierCategoryId: supplierCategoryId,
    dateOfBirth: indDetail.dateofbirth,
    mobileNumber: indDetail.phone,
    stateId: Number.parseInt(indAdrress.state),
    state: stateName,
    lgaId: Number.parseInt(indAdrress.lga),
    street: indAdrress.address,
    address: address,
    imageUrl: '',
    primaryContactName:  indDetail.firstname + ' ' + indDetail.lastname,
    primaryContactEmail: indDetail.email,
    primaryContactMobile: indDetail.phone,
    primaryContactGender: indDetail.email,
    accountLogin: signUpCred
  };

  this.signupService.individualSignupService(signUp).subscribe(res => {
    this.email = indDetail.email;

    if(res == "success"){
      this.ngxService.stop();
      this.page = 'otp';
    }
    else{
      this.ngxService.stop();
      this.toastr.error('System error', 'A system error has occured', {
        timeOut: 3000,
      });
    }
  }, (err: any) => {
    this.ngxService.stop();
    this.toastr.error('System error', 'A system error has occured', {
      timeOut: 3000,
    });
  });

  this.resetForm();


}

onSubmitBusinessAccoutCreation(){
  this.ngxService.start();
  const busDetail: BusinessDetail = this.businessRegistrationForm.value;
  const busAdrress: BusinessLocation = this.businessRegistrationForm_Location.value;
  const busCred: BusinessCred  = this.businessRegistrationForm_Credential.value;
  const busContact: BusinessContact = this.businessRegistrationForm_ContactPerson.value;

  const address = '';
  const stateName = '';
  const supplierCategoryId = 1;

  let signUpCred: AccountLogin = {
    email: busDetail.email,
    password: busCred.password1
  };

  let signUp: BusinessSignUp = {
    supplierName: busDetail.company,
    description: '',
    supplierCategoryId: supplierCategoryId,
    mobileNumber: busDetail.phone,
    stateId: Number.parseInt(busAdrress.state),
    state: stateName,
    lgaId: Number.parseInt(busAdrress.lga) ,
    street: busAdrress.address,
    address: address,
    imageUrl: '',
    primaryContactName: busContact.firstname + ' ' + busContact.lastname,
    primaryContactEmail: busDetail.email,
    primaryContactMobile: busContact.phone,
    primaryContactGender: busContact.gender,
    accountLogin: signUpCred
  }

  this.signupService.businessSignupService(signUp).subscribe(res => {

    this.email = busDetail.email;
    if(res == "success"){
      this.ngxService.stop();
      this.page = 'otp';
    }
    else{
      this.ngxService.stop();
      this.toastr.error('System error', 'A system error has occured', {
        timeOut: 3000,
      });
    }
  }, (err: any) => {
    this.ngxService.stop();
    this.toastr.error('System error', 'A system error has occured', {
      timeOut: 3000,
    });
  });

 this.resetForm();
}

onSubmitVerifyCode(){
  this.ngxService.start();
   const otp: {txt1: string, txt2: string, txt3: string, txt4: string, txt5: string, txt6: string} = this.otpForm.value;
   const otpStr = otp.txt1 + otp.txt2 + otp.txt3 + otp.txt4 + otp.txt5 + otp.txt6;

   this.signupService.verifyCode({email: this.email, code: otpStr}).subscribe(res => {

    if(res == "success"){
      this.ngxService.stop();
      this.page = 'successful';
    }
    else{
      this.ngxService.stop();
      this.toastr.error('System error', 'A system error has occured', {
        timeOut: 3000,
      });
    }
  }, (err: any) => {
    this.ngxService.stop();
    this.toastr.error('System error', 'A system error has occured', {
      timeOut: 3000,
    });
  });
  this.resetForm();
}

onSubmitLogin(){
  this.ngxService.start();
  const ema: {email: string} = this.signInForm.value;
  const pass: {password: string} = this.signInFormPassword.value;
  const credentials = {email: ema.email, password: pass.password};
  this.signupService.signIn(credentials).subscribe(res => {

   if(res.responseCode == "00"){
     console.log(res);
     this.ngxService.stop();
   // this.tokenService.generateToken();
     this.displayService.changeShowSignIns(true);
    this.signInFailed = false;
    this.router.navigate(['dashboard']);
   }
   else{
    this.signInFailed = true;
    this.ngxService.stop();
    this.toastr.error('System error', 'A system error has occured', {
      timeOut: 3000,
    });
   }
  }, error => {

    this.ngxService.stop();
    this.toastr.error('System error', 'A system error has occured', {
      timeOut: 3000,
    });
    this.signInFailed = true;
    console.log(error)
    this.error = error;
   // this.toasters.error('An error has occured!')
  })

}

resetForm(){
  this.individualRegistrationForm.reset(this.individualRegistrationForm.value);
  this.individualRegistrationForm_Location.reset(this.individualRegistrationForm_Location.value)
  this.individualRegistrationForm_Credential.reset(this.individualRegistrationForm_Credential.value);
  this.businessRegistrationForm.reset(this.businessRegistrationForm.value);
  this.businessRegistrationForm_Location.reset(this.businessRegistrationForm_Location.value);
  this.businessRegistrationForm_ContactPerson.reset(this.businessRegistrationForm_ContactPerson.value);
  this.businessRegistrationForm_Credential.reset(this.businessRegistrationForm_Credential.value);
  this.otpForm.reset(this.otpForm.value);
  this.signInForm.reset(this.signInForm.value);
  this.signInFormPassword.reset(this.signInFormPassword.value);
}

reloadComponent() {
  let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

  ngOnDestroy(): void {
   // this.displayService.ngOnDestroy();
  }
}
