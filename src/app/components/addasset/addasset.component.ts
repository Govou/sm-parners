import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AddAsset } from 'src/app/model/dtos/addasset';
import { ServiceCenterResponse } from 'src/app/model/dtos/service-centre-response';
import { AssetsService } from 'src/app/services/assets.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { environment } from 'src/environments/environment';
import { activatewallet } from 'src/app/model/wallet';
import { NgbModalConfig,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetRegistrationForm_1, AssetRegistrationForm_Schedule, AssetRegistrationForm_Visuals } from 'src/app/model/assetaddition';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { initializeApp } from "firebase/app";
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs';
import { PostTransactions } from 'src/app/model/dtos/post-transactions';

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
    private storage: AngularFireStorage
    ) { }

  serviceCentres: ServiceCenterResponse[] = [];
  states: {stateName: string, stateId: number}[] = [];
  makes:  {makeId: number, name: string}[] = [];
  models: {modelId: number, name: string, makeId: number}[] = [];
  categories: {categoryId: number, categoryName: string}[] = [];
  carTypes: string[] = [];

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

  assetRegistrationForm!: FormGroup;
  assetRegistrationForm_Visuals! : FormGroup;
  assetRegistrationForm_Schedule! : FormGroup;

  error = null;
  //isLoading: boolean = false;

  ngOnInit(): void {
    this.page = 'asset'

    this.utilitiesService.getStates().subscribe(res => {
      this.states = res;
    });

    this.assetService.getVehicleMakes().subscribe(res => {
      this.makes = res;
    });

    this.assetService.getSupplierCategories().subscribe(res => {
      this.categories = res;
    })

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
      'chasis': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'identificationnumber': new FormControl(null, Validators.required)
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
      });
      //console.log(imageUrl);
  }


  fetchServiceCentres(state: string){
    this.assetRegistrationForm_Schedule.patchValue({
      'price': ''
    });
    this.spinnerService.show();
    this.assetService.getServiceCentres(state).subscribe(res => {
      this.spinnerService.hide();
      this.serviceCentres = res;
    });
  }

  fetchModels(make: string){
    this.seletedMake = make;
    let makeId = Number.parseInt(make);
    this.assetService.getVehicleModels(makeId).subscribe(res => {
      this.models = res;
    });
  }

  selectServiceCentres(service_desc: string){
    this.assetRegistrationForm_Schedule.patchValue({
      'price': ''
    });
    let selectedCentre = this.serviceCentres.filter((x:ServiceCenterResponse)=>{ return x.service_desc == service_desc;})[0];
    console.log(selectedCentre);
    this.assetRegistrationForm_Schedule.patchValue({
      'price': selectedCentre.amount,
    });
    if(selectedCentre.amount == "" || selectedCentre.amount == null){
      this.bookingPrice = 0;
    }else{
      this.bookingPrice = Number.parseInt(selectedCentre.amount) ;
    }
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

  addNewAsset(payref: string, paygateway: string){

    // this.leftImageUpload();
    // this.rightImageUpload();
    // this.interiorImageUpload();
    // this.topImageUpload();
    // this.backImageUpload();

    const asset_1: AssetRegistrationForm_1 = this.assetRegistrationForm.value;
    const asset_2: AssetRegistrationForm_Visuals = this.assetRegistrationForm_Visuals.value;
    const asset_3: AssetRegistrationForm_Schedule = this.assetRegistrationForm_Schedule.value;

    const make = this.getMakeName();
    const serviceCentre = this.getServiceCentre(asset_3.center);
    const profileId: any  = localStorage.getItem('profileId')?.toString();
    var asset: AddAsset = {
      serviceName: make + ' ' + asset_1.model,
      make: make,
      model: asset_1.model,
      modelNumber: asset_1.modelnumber,
      imageUrl: '',
      trackerId: '',
      isAvailable: true,
      serialNumber: asset_1.chasis,
      identificationNumber: asset_1.platenumber,
      referenceNumber1: asset_1.platenumber,
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
      topViewImage: this.uploadedbackimageUrl, // localStorage.getItem('interiorImage')?.toString(),
      interiorViewImage: this.uploadedtopimageUrl, // localStorage.getItem('topImage')?.toString(),
      description: make + ' ' + asset_1.model,
      year: asset_1.year,
      paymentGateway: paygateway,
      paymentReference: payref,
      centreId: serviceCentre.centre_id,
      paymentType: 'online',
      bookingAmount: asset_3.price, //serviceCentre.amount,
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
            paymentReferenceInternal: '',
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
            this.spinnerService.hide();
            this.router.navigate(['/dashboard']);
        }, error => {
          this.error = error.message;
          this.spinnerService.hide();
        })

        }
    })
  }

  openVerticallyCentered(content:any) {
    this.modalService.open(content);
  }
  closeModal(content:any){
    this.modalService.dismissAll(content)
  }

  walletregistration = new activatewallet('','','','','',20000,'','');
  key= environment['paystackKey'];
  amt=''
  eml:any
  walletMessage:any
  walletResult:any

  paymentInit() {
    console.log('Payment initialized');
    this.walletregistration.amount = 20000
  }

  paymentDone(ref: {message: string, reference: string, status: string }) {
    //this.closeModal(ref);
    this.modalService.dismissAll(ref);
    this.spinnerService.show();
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

  postTransaction(transaction: PostTransactions){
    console.log(transaction);
    this.assetService.postTransaction(transaction).subscribe(res => {
      if(res.responseCode == "00"){
        return "success";
      }
      else
      {
        return "failed";
      }
    })
  }

}
