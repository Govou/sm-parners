import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ServiceCenterResponse } from 'src/app/model/dtos/service-centre-response';
import { AssetsService } from 'src/app/services/assets.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-servicecenters',
  templateUrl: './servicecenters.component.html',
  styleUrls: ['./servicecenters.component.css']
})
export class ServicecentersComponent implements OnInit {

  states: any;
  serviceCentres: ServiceCenterResponse[] = [];
  constructor(private assetService: AssetsService, private utilService: UtilitiesService, private ngxService: NgxUiLoaderService ) { }
  SPINNER = SPINNER
 state: string = "";
  ngOnInit(): void {
    console.log(this.state)
    this.utilService.getStates().subscribe(res => {
      this.states = res;
    }
    )
   // this.assetService.getServiceCentres()
  }

  onStateSelected(state: any){
    this.ngxService.start();
    console.log(state)
    this.assetService.getServiceCentres(state).subscribe(res => {
      this.ngxService.stop();
      this.serviceCentres = res;
      if(this.serviceCentres.length > 0){
        this.serviceCentres = this.serviceCentres.filter(
          (sc: ServiceCenterResponse, i: number, arr: ServiceCenterResponse[]) => arr.findIndex(t => t.centre_id === sc.centre_id) === i
        );
      }
    })
  }
}
