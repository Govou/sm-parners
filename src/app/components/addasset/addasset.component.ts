import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AddAsset } from 'src/app/model/dtos/addasset';
import { ServiceCenterResponse } from 'src/app/model/dtos/service-centre-response';
import { AssetsService } from 'src/app/services/assets.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { environment } from 'src/environments/environment';
import { Payment } from 'src/app/model/payment';
import { NgbModalConfig,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetRegistrationForm_1, AssetRegistrationForm_Schedule, AssetRegistrationForm_Visuals } from 'src/app/model/assetaddition';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs';
import { PostTransactions } from 'src/app/model/dtos/post-transactions';
import { AuthService } from 'src/app/services/auth.service';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { Flutterwave, InlinePaymentOptions, PaymentSuccessResponse } from 'flutterwave-angular-v3';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-addasset',
  templateUrl: './addasset.component.html',
  styleUrls: ['./addasset.component.css']
})
export class AddassetComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private assetService: AssetsService,
    private utilitiesService: UtilitiesService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService,
    private flutterwave: Flutterwave
    ) {  }
  SPINNER = SPINNER
  serviceCentres: ServiceCenterResponse[] = [];
  states: {stateName: string, stateId: number}[] = [];
  makes:  {makeId: number, name: string}[] = [];
  models: {modelId: number, name: string, makeId: number}[] = [];
  categories: {categoryId: number, categoryName: string}[] = [];
  carTypes: string[] = [];
  selectedYear: number = 0;
  years: number[] = [];

  successfullyAdded: boolean = false;

  minDate: any;
  maxDate: any;
  minTime: any;
  maxTime: any;

  frontimageUrl: any;
  backimageUrl: any;
  leftimageUrl: any;
  rightimageUrl:any;
  interiorimageUrl: any;
  topimageUrl: any;

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
  bookingPrice = 0;
  seletedMake = '';
  paymentStatus = '';
  payment = new Payment('','','','','',0,'','');
  key= environment['paystackKey'];
  assetRegistrationForm!: FormGroup;
  assetRegistrationForm_Visuals! : FormGroup;
  assetRegistrationForm_Schedule! : FormGroup;

  error = null;
  //isLoading: boolean = false;

  ngOnInit(): void {
    this.page = 'asset'

    var date = new Date();
    this.minDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    console.log('mindate', this.minDate)
    this.minTime = '9:00'
    this.maxTime = '5:00';

    this.utilitiesService.getStates().subscribe(res => {
      this.states = res;
    }, (err: any) => {
      this.toastr.error('System error', 'A system error has occured', {
        timeOut: 3000,
      });
    });

    this.assetService.getVehicleMakes().subscribe(res => {
      this.makes = res;
    }, (err: any) => {
      this.toastr.error('System error', 'A system error has occured', {
        timeOut: 3000,
      });
    });

    this.assetService.getSupplierCategories().subscribe(res => {
      this.categories = res;
    }, (err: any) => {
      this.toastr.error('System error', 'A system error has occured', {
        timeOut: 3000,
      });
    })

    this.selectedYear = new Date().getFullYear();
    for (let year = this.selectedYear; year >= 1990; year--) {
      this.years.push(year);
    }

    this.frontimageUrl = environment["defaultImageUrl"];
    this.leftimageUrl = environment["defaultImageUrl"];
    this.rightimageUrl = environment["defaultImageUrl"];
    this.backimageUrl = environment["defaultImageUrl"];
    this.interiorimageUrl = environment["defaultImageUrl"];

    this.assetRegistrationForm = new FormGroup({
      'make': new FormControl(null, Validators.required),
      'model': new FormControl(null, Validators.required),
      'year': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'type': new FormControl(null, Validators.required),
      'modelnumber': new FormControl(null, Validators.required),
      'platenumber': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'chasis': new FormControl(null, [Validators.required, Validators.minLength(4)])
    });

    this.assetRegistrationForm_Visuals = new FormGroup({
      'frontImage': new FormControl(null, Validators.required),
      'backImage': new FormControl(null, Validators.required),
      'leftImage': new FormControl(null, Validators.required),
      'rightImage': new FormControl(null, Validators.required),
      'interiorImage': new FormControl(null, Validators.required),
      'topImage': new FormControl(null)
    });

    this.assetRegistrationForm_Schedule = new FormGroup({
      'statename': new FormControl(null, Validators.required),
      'center': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required),
      'time': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required)
    })

    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;

    this.carTypes = ["Sedan", "Coupe", "Sport car", "Station wagon", "Hatchback", "Convertible", "Sport-Utility Vehicle -(SUV)", "Minivan", "Pickup truck"]
  }
  ///////////////////////////////////////////////////////////////////////////////////////////

  page:any
  image=true;

  home(){
    this.router.navigate(['/home']);
  }
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

  onFrontImageChange(event: any) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.frontimageFile = file;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.frontimageUrl = reader.result as string;
      };
      this.frontImageUpload();
    }
  }

  onBackImageChange(event: any) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.backimageFile = file
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.backimageUrl = reader.result as string;
      };
      this.backImageUpload();
    }
  }

  onLeftImageChange(event: any) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.leftimageFile = file;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.leftimageUrl = reader.result as string;
      };
      this.leftImageUpload();
    }
  }

  onRightImageChange(event: any) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.rightimageFile = file;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.rightimageUrl = reader.result as string;
      };
      this.rightImageUpload();
    }
  }

  onInteriorImageChange(event: any) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.interiorimageFile = file;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.interiorimageUrl = reader.result as string;
      };
      this.interiorImageUpload();
    }
  }

  onTopImageChange(event: any) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.topimageFile = file;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.topimageUrl = reader.result as string;
      };
      this.topImageUpload();
    }
  }

  frontImageUpload(){
    this.imageUpload(this.frontimageFile, "front");
  }

  backImageUpload(){
    this.imageUpload(this.backimageFile, "back");
  }

  leftImageUpload(){
   this.imageUpload(this.leftimageFile, "left");
  }

  rightImageUpload(){
   this.imageUpload(this.rightimageFile, "right");
  }

  interiorImageUpload(){
    this.imageUpload(this.interiorimageFile, "interior");
  }

  topImageUpload(){
    this.imageUpload(this.topimageFile, "top");
  }


  imageUpload(selectedfile: any, position: string) {
    let imageUrl = '';
    var n = Date.now();
    const filePath = `NewSupplierServices/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`NewSupplierServices/${n}`, selectedfile);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            imageUrl = url;
            if(position == "top"){
              this.uploadedtopimageUrl = imageUrl;
            }
            if(position == "back"){
              this.uploadedbackimageUrl = imageUrl;
            }
            if(position == "right"){
              this.uploadedrightimageUrl = imageUrl;
            }
            if(position == "left"){
              this.uploadedleftimageUrl = imageUrl;
            }
            if(position == "front"){
              this.uploadedfrontimageUrl = imageUrl;
            }
            if(position == "interior"){
              this.uploadedinteriorimageUrl = imageUrl;
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
         // console.log(url);
        }
      }, (err: any) => {
        this.toastr.error('System error', 'A system error has occured', {
          timeOut: 3000,
        });
      });
      //console.log(imageUrl);
  }


  fetchServiceCentres(state: string){
    this.assetRegistrationForm_Schedule.patchValue({
      'price': ''
    });
    //this.spinnerService.show();
    this.ngxService.start();
    this.assetService.getServiceCentres(state).subscribe(res => {
      this.ngxService.stop();
      this.serviceCentres = res;
    }, (err: any) => {
      this.ngxService.stop();
      this.toastr.error('System error', 'A system error has occured', {
        timeOut: 3000,
      });
    });
  }

  fetchModels(make: string){
    this.seletedMake = make;
    let makeId = Number.parseInt(make);
    this.assetService.getVehicleModels(makeId).subscribe(res => {
      this.models = res;
    }, (err: any) => {
      this.toastr.error('System error', 'A system error has occured', {
        timeOut: 3000,
      });
    });
  }

  selectServiceCentres(service_desc: string){
    this.ngxService.start();
    this.assetRegistrationForm_Schedule.patchValue({
      'price': ''
    });
    const asset_1: AssetRegistrationForm_1 = this.assetRegistrationForm.value;
    var type = asset_1.type;
    this.assetService.getSupplierBookingPrice(type).subscribe(res => {

    this.ngxService.stop();
      if(res.responseData == null){
        this.bookingPrice = 0;
      }else{
        this.bookingPrice = res.responseData.bookingPrice ;
        this.assetRegistrationForm_Schedule.patchValue({
          'price': res.responseData.bookingPrice,
        });
      }
    }, (err: any) => {
      this.ngxService.stop();
      this.toastr.error('System error', 'A system error has occured', {
        timeOut: 3000,
      });
    })
  }


  getMakeName(): string{
    const makeId = Number.parseInt(this.seletedMake);
    let selectedCar = this.makes.filter((x:{makeId: number, name: string}) => { return x.makeId == makeId })[0];
    return selectedCar.name;
  }

  getServiceCentre(centreDesc: string): ServiceCenterResponse{
    const serviceCentre = this.serviceCentres.filter((x:ServiceCenterResponse) => x.service_desc == centreDesc)[0];
    return serviceCentre;
  }
  get profileId(): string {
    return this.authService.profileId;
  }
  addNewAsset(payref: string, paygateway: string){
    // this.leftImageUpload();
    // this.rightImageUpload();
    // this.interiorImageUpload();
    // this.topImageUpload();
    // this.backImageUpload();

    const asset_1: AssetRegistrationForm_1 = this.assetRegistrationForm.value;
    const asset_2: AssetRegistrationForm_Visuals = this.assetRegistrationForm_Visuals.value;
    const asset_3: AssetRegistrationForm_Schedule = this.assetRegistrationForm_Schedule.value;
    this.bookingPrice = Number.parseInt(asset_3.price);
    const make = this.getMakeName();
    const serviceCentre = this.getServiceCentre(asset_3.center);

    const profileId: any  = Number.parseInt(this.profileId || '') //this.authService.profileId;
    var asset: AddAsset = {
      serviceName: make + ' ' + asset_1.model,
      make: make,
      model: asset_1.model,
      type: asset_1.type,
      modelNumber: asset_1.modelnumber,
      imageUrl: '',
      trackerId: '',
      isAvailable: true,
      serialNumber: asset_1.chasis,
      identificationNumber: asset_1.platenumber,
      referenceNumber1: '',
      referenceNumber2: '',
      referenceNumber3: '',
      unitCostPrice: asset_3.price,
      averagePrice: asset_3.price,
      standardDiscount: '',
      supplierId: 0,
      frontViewImage: this.uploadedfrontimageUrl,
      leftViewImage: this.uploadedleftimageUrl,
      rightViewImage: this.uploadedrightimageUrl,
      rearViewImage: this.uploadedbackimageUrl,
      topViewImage: this.uploadedbackimageUrl,
      interiorViewImage: this.uploadedtopimageUrl,
      description: make + ' ' + asset_1.model,
      year: asset_1.year,
      paymentGateway: paygateway,
      paymentReference: payref,
      centreId: serviceCentre.centre_id,
      paymentType: 'online',
      bookingAmount: asset_3.price,
      bookingAddress: serviceCentre.address,
      bookingState: serviceCentre.state,
      appointmentDate: asset_3.date,
      appointmentTime: asset_3.time,
      profileId: profileId  ,
      serviceId: serviceCentre.service_id,
      providerId: serviceCentre.provider_id
    }

    console.log(asset);
    this.assetService.addNewAsset(asset).subscribe(res =>{
        console.log(res);
        if (res.responseCode == "00"){

          var transaction: PostTransactions = {
            profileId: Number.parseInt(profileId),
            paymentGateway: paygateway,
            paymentReferenceInternal: asset_1.platenumber,
            paymentReferenceGateway: payref,
            contractId: 0,
            paymentGatewayResponseCode: this.paymentStatus,
            paymentGatewayResponseDescription: this.paymentStatus,
            value: Number.parseInt(asset_3.price),
            vat: 0,
            transactionType: 'Supplier Payment',
            transactionSource: 'Secure mobility Web',
            paymentConfirmed: true
          };

         this.assetService.postTransaction(transaction).subscribe(res =>{
            console.log(res);
           //
            this.successfullyAdded = true;

             console.log('stop')
           // this.router.navigate(['/dashboard']);
        }, (err: any) => {
            this.ngxService.stop();
            this.toastr.error('System error', 'A system error has occured', {
              timeOut: 3000,
            });
        })

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
  }

  openVerticallyCentered(content:any) {
    this.modalService.open(content);
  }
  closeModal(content:any){
    this.modalService.dismissAll(content)
  }


  // amt=''
  // eml:any
  paymentMessage:any
  // walletResult:any

  paymentInit() {
    console.log('Payment initialized');
    this.payment.amount = this.bookingPrice;
  }

  paymentDone(ref: {message: string, reference: string, status: string }) {
    //this.closeModal(ref);
    this.modalService.dismissAll(ref);
    // this.spinnerService.show();
    this.ngxService.start();
    console.log(this.title, ref);
    this.paymentStatus = ref.status;
    if(ref.status == 'success'){
        this.addNewAsset(ref.reference, 'paystack');
    }

  }

  paymentCancel() {
    console.log('payment failed');
    this.page = 'payment'
  }

  resetForm(){
    this.assetRegistrationForm.reset(this.assetRegistrationForm.value);
   this.assetRegistrationForm_Visuals.reset(this.assetRegistrationForm_Visuals.value);
   this.assetRegistrationForm_Schedule.reset(this.assetRegistrationForm_Schedule.value);
  }


  get profileName(): string {
    return this.authService.profileName;
  }

  get profileEmail(): string {
    return this.authService.email;
  }

////////////////////////////////////////////////////////////////////////////////////
////Flutterwave integration////////////////////
publicKey = environment['flutterwaveKey'];

  customerDetails = {
    name: this.profileName,
    email: this.profileEmail,
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
        this.addNewAsset((this.flutterresponse.transaction_id || '').toString(), 'flutter');
    }
  }

  generateReference(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }


}
