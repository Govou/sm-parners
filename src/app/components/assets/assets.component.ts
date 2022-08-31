import { Component, OnInit } from '@angular/core';
import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { ServiceCenterResponse } from 'src/app/model/dtos/service-centre-response';
import { NgbModalConfig,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { activatewallet } from 'src/app/model/wallet';
import { environment } from 'src/environments/environment';



import * as $ from 'jquery';
import { ManagedAssetsService } from 'src/app/services/managed-assets.service';
import { ManagedAssets } from 'src/app/model/dtos/managedassets';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
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
    private managedAssetsService: ManagedAssetsService, 
    private ngxService: NgxUiLoaderService) { config.type = 'dark' }

  serviceCentres: ServiceCenterResponse[] = [];
  states: {stateName: string, stateId: number}[] = [];
  makes:  {makeId: number, name: string}[] = [];
  models: {modelId: number, name: string, makeId: number}[] = [];
  categories: {categoryId: number, categoryName: string}[] = [];
  carTypes: string[] = [];
  selectedYear: number = 0;
  years: number[] = [];

  successfullyAdded: boolean = false;

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


  managedAssets: ManagedAssets = {
    pendingReview: [],
    completedReview: []
  };
  searchText: any;
  pendingReviewEmpty: boolean = false;
  completedReviewEmpty: boolean = false;
  allEmpty: boolean = false;
  filteredProperty:string = '';
  
  SPINNER = SPINNER
  page: any;
  loaded:any

  ngOnInit(): void {
    this.loaded = 'first';
    this.page = 'asset';
    const profileId = Number.parseInt(localStorage.getItem('pid') || '');
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
    })
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;

  }
  review(){
    this.loaded = 'second'
  }
  backArrow(){
    this.loaded = 'first'
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
    // this.spinnerService.show();
    this.ngxService.start();
    console.log(this.title, ref);
    this.paymentStatus = ref.status;
    if(ref.status == 'success'){
        // this.addNewAsset(ref.reference, 'paystack');
    }

  }

  paymentCancel() {
    console.log('payment failed');
    this.page = 'payment'
  }


}
