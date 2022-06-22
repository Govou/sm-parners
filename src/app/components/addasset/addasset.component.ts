import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { strictEqual } from 'assert';
import { addAsset } from 'src/app/model/addasset';
import { ServiceCenterResponse } from 'src/app/model/dtos/service-centre-response';
import { AssetsService } from 'src/app/services/assets.service';
import { UtilitiesService } from 'src/app/services/utilities.service';



@Component({
  selector: 'app-addasset',
  templateUrl: './addasset.component.html',
  styleUrls: ['./addasset.component.css']
})
export class AddassetComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private assetService: AssetsService, private utilitiesService: UtilitiesService) { }

  serviceCentres: ServiceCenterResponse[] = [];
  states: {stateName: string, stateId: number}[] = [];
  makes:  {id: number, name: string}[] = [];
  models: {id: number, name: string}[] = [];
  categories: {categoryId: number, categoryName: string}[] = [];

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
  }
  ///////////////////////////////////////////////////////////////////////////////////////////

  page:any
  image=true;
  addAsset = new addAsset('','','','','','',true,'','','','','','','','',0,'','','','','','');

  assetForm(){
    this.page = 'asset'
  }
  visualsForm(){
    this.page = 'visuals'
  }
  scheduleForm(){
    this.page = 'schedule'
  }

  url = 'https://img.icons8.com/ios/100/000000/contract-job.png';
  onSelect(event:any) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    } else {
      window.alert('Please select correct image format');
    }
  }

  ///////////////////////////////////////////////////////////////

  fetchServiceCentres(state: string){
    this.assetService.getServiceCentres(state).subscribe(res => {
      this.serviceCentres = res;
    });
  }

  fetchModels(make: string){
    let makeId: number = Number.parseInt(make, 10);
    makeId = makeId + 1;
    this.assetService.getVehicleModels(makeId).subscribe(res => {
      this.models = res;
    });
  }
}
