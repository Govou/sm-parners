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
    private spinnerService: NgxSpinnerService
    ) { }

  serviceCentres: ServiceCenterResponse[] = [];
  states: {stateName: string, stateId: number}[] = [];
  makes:  {makeId: number, name: string}[] = [];
  models: {modelId: number, name: string, makeId: number}[] = [];
  categories: {categoryId: number, categoryName: string}[] = [];
  carTypes: string[] = [];

  frontimageUrl: string = "";
  backimageUrl: string = "";
  leftimageUrl: string = "";
  rightimageUrl: string = "";
  interiorimageUrl: string = "";

  reference = '';
  title = '';
  bookingPrice = 0;
  seletedMake = '';

  assetRegistrationForm!: FormGroup;
  assetRegistrationForm_Visuals! : FormGroup;
  assetRegistrationForm_Schedule! : FormGroup;

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
      'interiorImage': new FormControl(null, Validators.required)
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


  onLeftImageSelect(event:any) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.leftimageUrl = event.target.result;
      };
    } else {
      window.alert('Please select correct image format');
    }
  }

  onRightImageSelect(event:any) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.rightimageUrl = event.target.result;
      };
    } else {
      window.alert('Please select correct image format');
    }
  }

  onBackImageSelect(event:any) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.backimageUrl = event.target.result;
      };
    } else {
      window.alert('Please select correct image format');
    }
  }

  onInteriorImageSelect(event:any) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.interiorimageUrl = event.target.result;
      };
    } else {
      window.alert('Please select correct image format');
    }
  }

  onFrontImageSelect(event:any) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.frontimageUrl = event.target.result;
      };
    } else {
      window.alert('Please select correct image format');
    }
  }

  fetchServiceCentres(state: string){
    this.assetService.getServiceCentres(state).subscribe(res => {
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

  selectServiceCentres(centre: string){
    this.assetRegistrationForm_Schedule.patchValue({
      'price': ''
    });
    let selectedCentre = this.serviceCentres.filter((x:ServiceCenterResponse)=>{ return x.centre_id == centre;})[0];
    console.log(selectedCentre);
    this.assetRegistrationForm_Schedule.patchValue({
      'price': selectedCentre.amount,
    });
    this.bookingPrice = Number.parseInt(selectedCentre.amount) ;
  }

  getMakeName(): string{
    const makeId = Number.parseInt(this.seletedMake);
    let selectedCar = this.makes.filter((x:{makeId: number, name: string}) => { return x.makeId == makeId })[0];
    return selectedCar.name;
  }

  getServiceCentre(centrId: string): ServiceCenterResponse{
    const serviceCentre = this.serviceCentres.filter((x:ServiceCenterResponse) => x.centre_id == centrId)[0];
    return serviceCentre;
  }

  addNewAsset(payref: string, paygateway: string){
    const asset_1: AssetRegistrationForm_1 = this.assetRegistrationForm.value;
    const asset_2: AssetRegistrationForm_Visuals = this.assetRegistrationForm_Visuals.value;
    const asset_3: AssetRegistrationForm_Schedule = this.assetRegistrationForm_Schedule.value;
    const make = this.getMakeName();
    const serviceCentre = this.getServiceCentre(asset_3.center);
    const profileId: string | undefined = localStorage.getItem('profileId')?.toString();
    var asset: AddAsset = {
      serviceName: make + ' ' + asset_1.model,
      make: make,
      model: asset_1.model,
      modelNumber: asset_1.modelnumber,
      imageUrl: '',
      trackerId: '',
      isAvailable: true,
      serialNumber: asset_1.chasis,
      identificationNumber: asset_1.identificationnumber,
      referenceNumber1: asset_1.platenumber,
      referenceNumber2: '',
      referenceNumber3: '',
      unitCostPrice: serviceCentre.amount,
      averagePrice: serviceCentre.amount,
      standardDiscount: '',
      supplierId: 0,
      frontViewImage: 'https://firebasestorage.googleapis.com/v0/b/halo-biz.appspot.com/o/ServiceItem%2F1655281123984?alt=media&token=e94568e3-4a26-4d01-add3-d70522f74d21',
      leftViewImage: 'https://firebasestorage.googleapis.com/v0/b/halo-biz.appspot.com/o/ServiceItem%2F1655281123984?alt=media&token=e94568e3-4a26-4d01-add3-d70522f74d21',
      rightViewImage: 'https://firebasestorage.googleapis.com/v0/b/halo-biz.appspot.com/o/ServiceItem%2F1655281123984?alt=media&token=e94568e3-4a26-4d01-add3-d70522f74d21',
      rearViewImage: 'https://firebasestorage.googleapis.com/v0/b/halo-biz.appspot.com/o/ServiceItem%2F1655281123984?alt=media&token=e94568e3-4a26-4d01-add3-d70522f74d21',
      topViewImage: 'https://firebasestorage.googleapis.com/v0/b/halo-biz.appspot.com/o/ServiceItem%2F1655281123984?alt=media&token=e94568e3-4a26-4d01-add3-d70522f74d21',
      interiorViewImage: 'https://firebasestorage.googleapis.com/v0/b/halo-biz.appspot.com/o/ServiceItem%2F1655281123984?alt=media&token=e94568e3-4a26-4d01-add3-d70522f74d21',
      description: make + ' ' + asset_1.model,
      year: asset_1.year,
      paymentGateway: paygateway,
      paymentReference: payref,
      centreId: serviceCentre.centre_id,
      paymentType: 'online',
      bookingAmount: serviceCentre.amount,
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
      this.spinnerService.hide();
        console.log(res);
        if (res.responseCode == "00"){
          this.router.navigate(['/dashboard']);
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

}
