import { Component, OnInit } from '@angular/core';
import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { ServiceCenterResponse } from 'src/app/model/dtos/service-centre-response';
import { NgbModalConfig,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ManagedAssetsService } from 'src/app/services/managed-assets.service';
import { ManagedAssets } from 'src/app/model/dtos/managedassets';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { Payment } from 'src/app/model/payment';
import { Flutterwave, InlinePaymentOptions, PaymentSuccessResponse } from 'flutterwave-angular-v3';
import { AssetsService } from 'src/app/services/assets.service';
import { ServiceRenewal } from 'src/app/model/dtos/service-renewal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css'],
  providers: [NgbAccordionConfig]
})
export class AssetsComponent implements OnInit {

  constructor(config: NgbAccordionConfig,
    private modalService: NgbModal,
    private router: Router,
    private authService: AuthService,
    private managedAssetsService: ManagedAssetsService,
    private assetsService: AssetsService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService,
    private flutterwave: Flutterwave) { config.type = 'dark' }

    make: any;
    model: any;
    modelNumber: any;
    serialNumber: any;
    identificationNumber: any;
    frontViewImage: any;
    leftViewImage: any;
    rightViewImage: any;
    rearViewImage: any;
    topViewImage: any;
    interiorViewImage: any;
    type: any;
    year: any;
    serviceCenterLocation: any;
    serviceCenterState: any;
    vehicleIdentificationNumber:any;

    renewalAmount: number = 0;

  serviceCentres: ServiceCenterResponse[] = [];
  states: {stateName: string, stateId: number}[] = [];
  makes:  {makeId: number, name: string}[] = [];
  models: {modelId: number, name: string, makeId: number}[] = [];
  categories: {categoryId: number, categoryName: string}[] = [];
  carTypes: string[] = [];
  selectedYear: number = 0;
  years: number[] = [];
  paymentMessage:any;
  successfullyAdded: boolean = false;

  serviceId: any;

  payment = new Payment('','','','','',0,'','');

  frontimageUrl: any;
  backimageUrl: any;
  leftimageUrl: any;
  rightimageUrl:any;
  interiorimageUrl: any;
  topimageUrl: any;

  gateway:string = '';

  uploadedfrontimageUrl: any;
  uploadedbackimageUrl: any;
  uploadedleftimageUrl: any;
  uploadedrightimageUrl:any;
  uploadedinteriorimageUrl: any;
  uploadedtopimageUrl: any;

  frontimageFile!: any;
  backimageFile!: any;
  leftimageFile!: any;
  rightimageFile!: any;
  interiorimageFile!: any;
  topimageFile!: any;

  downloadURL: Observable<string> | undefined;
  imageUrl: any;

  reference = '';
  title = '';
  bookingPrice = 2000;
  seletedMake = '';
  paymentStatus = '';

  assetRegistrationForm!: FormGroup;
  assetRegistrationForm_Visuals! : FormGroup;
  assetRegistrationForm_Schedule! : FormGroup;

  error = null;


  managedAssets: ManagedAssets = {
    pendingReview: [],
    completedReview: []
  };
  searchText: any;
  pendingReviewEmpty: boolean = false;
  completedReviewEmpty: boolean = false;
  allEmpty: boolean = false;
  filteredProperty:string = '';
  successfullyRenewed: boolean = false;
  SPINNER = SPINNER
  page: any;
  loaded:any

  get profileId(): string{
    return this.authService.profileId;
  }

  ngOnInit(): void {
    this.loaded = 'first';
    this.page = 'asset';
    const profileId = Number.parseInt(this.profileId || '');
    this.ngxService.start();
    this.managedAssetsService.getManagedAssets(profileId).subscribe(res => {
      this.ngxService.stop();
      this.managedAssets = res;
      if(this.managedAssets.completedReview.length == 0){
        this.completedReviewEmpty = true;
      }
      if(this.managedAssets.pendingReview.length == 0){
        this.pendingReviewEmpty = true;
      }
      if(this.completedReviewEmpty == true && this.pendingReviewEmpty == true){
        this.allEmpty = true;
      }
    }, (err: any) => {
      this.ngxService.stop();
      this.toastr.error('System error', 'A system error has occured', {
        timeOut: 3000,
      });
    })
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;

    this.assetRegistrationForm = new FormGroup({
      'make': new FormControl(null),
      'model': new FormControl(null),
      'year': new FormControl(null),
      'type': new FormControl(null),
      'modelnumber': new FormControl(null),
      'platenumber': new FormControl(null),
      'chasis': new FormControl(null),
      'identificationnumber': new FormControl(null)
    });

    this.assetRegistrationForm_Visuals = new FormGroup({
      'frontImage': new FormControl(null),
      'backImage': new FormControl(null),
      'leftImage': new FormControl(null),
      'rightImage': new FormControl(null),
      'interiorImage': new FormControl(null),
      'topImage': new FormControl(null)
    });

    this.assetRegistrationForm_Schedule = new FormGroup({
      'statename': new FormControl(null),
      'center': new FormControl(null),
      'date': new FormControl(null),
      'time': new FormControl(null),
      'price': new FormControl(null)
    })
  }
  review(id: number){
    this.serviceId = id;
    this.ngxService.start();
    this.assetsService.getSupplierServiceDetails(id).subscribe(res => {
      console.log(res);
      if(res.responseCode == "00"){
        this.make = res.responseData.make;
        this.model = res.responseData.model;
        this.modelNumber = res.responseData.modelNumber;
        this.serialNumber = res.responseData.serialNumber;
        this.identificationNumber = res.responseData.identificationNumber;
        this.frontViewImage = res.responseData.frontViewImage;
        this.leftViewImage = res.responseData.leftViewImage;
        this.rightViewImage = res.responseData.rightViewImage;
        this.rearViewImage = res.responseData.rearViewImage;
        this.topViewImage = res.responseData.topViewImage;
        this.interiorViewImage = res.responseData.interiorViewImage;
        this.type = res.responseData.type
        this.vehicleIdentificationNumber = res.responseData.vehicleIdentificationNumber
        this.year = res.responseData.yearOfMake
        this.serviceCenterLocation = res.responseData.serviceCenterLocation;
        this.serviceCenterState = res.responseData.serviceCenterState
        this.renewalAmount = res.responseData.unitCostPrice
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
    })
    this.loaded = 'second'
  }
  backArrow(){
    this.loaded = 'first'
  }

  home(){
    this.router.navigate(['/dashboard']);
  }

  addNewAsset(){
    this.router.navigate(['/addasset']);
  }

  image=true;

  assetForm(){
    this.page = 'asset'
  }
  visualsForm(){
    this.page = 'visuals'
  }
  scheduleForm(){
    this.page = 'schedule'
  }
  paymentPage(content:any){
    this.page = 'payment'
    this.modalService.open(content);
  }
  //walletregistration = new activatewallet('','','','','',20000,'','');
  key= environment['paystackKey'];
  amt=''
  eml:any
  walletMessage:any
  walletResult:any

  paymentInit() {
    console.log('Payment initialized');
    this.bookingPrice = 20000
  }

  paymentDone(ref: {message: string, reference: string, status: string }) {
    //this.closeModal(ref);
    this.modalService.dismissAll(ref);
    // this.spinnerService.show();
    this.ngxService.start();
    console.log(this.title, ref);
    this.paymentStatus = ref.status;
    if(ref.status == 'success'){
        // this.addNewAsset(ref.reference, 'paystack');
        this.ngxService.start();
        this.renewService(ref.reference, 'paystack');
    }

  }

  paymentCancel() {
    console.log('payment failed');
    this.page = 'payment'
  }

  ////////////////////////////////////////////////////////////////////////////////////
////Flutterwave integration////////////////////
publicKey = environment['flutterwaveKey'];

customerDetails = {
  name:  this.profileName,
  email:  this.profileEmail,
  phone_number: localStorage.getItem('phonenumber')
};

customizations = {
  title: "Halobiz",
  description: "Halobiz Payment",
  logo: "https://flutterwave.com/images/logo-colored.svg",
};

meta = { counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" };

paymentData: InlinePaymentOptions = {
  public_key: this.publicKey,
  tx_ref: this.generateReference(),
  amount: this.bookingPrice,
  currency: "NGN",
  payment_options: "card,ussd",
  redirect_url: "",
  meta: this.meta,
  customer: this.customerDetails,
  customizations: this.customizations,
  callback: this.makePaymentCallback,
  onclose: this.closedPaymentModal,
  callbackContext: this,

};
//Inject the flutterwave service
makePayment() {
  this.paymentData.amount = this.bookingPrice;
  this.flutterwave.inlinePay(this.paymentData);
}

makePaymentCallback(response: PaymentSuccessResponse): void {
  this.flutterresponse = response;
  this.closedPaymentModal();
}

flutterresponse: PaymentSuccessResponse = new PaymentSuccessResponse();
closedPaymentModal(): void {
  this.flutterwave.closePaymentModal(3)

  this.modalService.dismissAll();
  // this.spinnerService.show();
  this.ngxService.start();
  console.log(this.title, this.flutterresponse);
 // this.paymentStatus = response.status;
  if(this.flutterresponse.status == 'completed'){
    this.ngxService.start();
      this.renewService((this.flutterresponse.transaction_id || '').toString(), 'flutter');
  }
}


generateReference(){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

renewService(payref: string, paygateway: string){
  var post = new ServiceRenewal();
  post.amount = this.bookingPrice;
  post.paymentGateway = paygateway;
  post.paymentReference = payref;
  post.serviceId = this.serviceId;
  post.supplierId = Number.parseInt(this.profileId || '');
  this.assetsService.postServiceRenewal(post).subscribe(res => {
    console.log(res);

     if(res.responseCode == "00"){
      this.successfullyRenewed = true;
      this.ngxService.stop();
     }
     else{
      this.ngxService.stop();
      this.toastr.error('System error', 'A system error has occured', {
        timeOut: 3000,
      });
     }
  }, (error:any) => {
    this.ngxService.stop();
    this.toastr.error('System error', 'A system error has occured', {
      timeOut: 3000,
    });
  })

  }

  get profileName(): string {
    return this.authService.profileName;
  }

  get profileEmail(): string {
    return this.authService.email;
  }


  goToAddAsset(){
    this.router.navigate(['/addasset'])
  }
}
