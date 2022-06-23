import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { addAsset } from 'src/app/model/addasset';
import { ServiceCenterResponse } from 'src/app/model/dtos/service-centre-response';
import { AssetsService } from 'src/app/services/assets.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { environment } from 'src/environments/environment';
import { activatewallet } from 'src/app/model/wallet';
import { NgbModalConfig,NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-addasset',
  templateUrl: './addasset.component.html',
  styleUrls: ['./addasset.component.css']
})
export class AddassetComponent implements OnInit {

  constructor(private modalService: NgbModal,private assetService: AssetsService, private utilitiesService: UtilitiesService) { }

  serviceCentres: ServiceCenterResponse[] = [];
  states: {stateName: string, stateId: number}[] = [];
  makes:  {id: number, name: string}[] = [];
  models: {id: number, name: string}[] = [];
  categories: {categoryId: number, categoryName: string}[] = [];

  frontimageUrl: string = "";
  backimageUrl: string = "";
  leftimageUrl: string = "";
  rightimageUrl: string = "";
  interiorimageUrl: string = "";

  reference = '';
  title = '';

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
      'platenumber': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'chasis': new FormControl(null, [Validators.required, Validators.minLength(4)]),
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
    // let selectedMake = this.makes.filter((x:{id: number, name: string})=>{ return x.name == make;})[0];
    // console.log(selectedMake);
    let makeId = Number.parseInt(make);
    makeId = makeId + 1;
    this.assetService.getVehicleModels(makeId).subscribe(res => {
      this.models = res;
    });
  }

  SelectServiceCentres(centre: string){
    this.assetRegistrationForm_Schedule.patchValue({
      'price': ''
      // formControlName2: myValue2 (can be omitted)
    });
    let selectedCentre = this.serviceCentres.filter((x:ServiceCenterResponse)=>{ return x.centre_id == centre;})[0];
    console.log(selectedCentre);
    //this.assetRegistrationForm_Schedule.get('price')?.value = selectedCentre.amount.toString()
    this.assetRegistrationForm_Schedule.patchValue({
      'price': selectedCentre.amount,
      // formControlName2: myValue2 (can be omitted)
    });
  }

  openVerticallyCentered(content:any) {
    this.modalService.open(content);
  }
  closeModal(content:any){
    this.modalService.dismissAll(content)
  }

  walletregistration = new activatewallet('','','','','',20000,'','');
  key='pk_test_61980d19f89fe51c0bca4d5dbcf0e669be155447'
  amt=''
  eml:any
  walletMessage:any
  walletResult:any

  paymentInit() {
    console.log('Payment initialized');
    this.walletregistration.amount = 20000
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    console.log(this.title, ref);
  }

  paymentCancel() {
    console.log('payment failed');
  }

}
