import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { DashboardDetails } from 'src/app/model/dashboard';
import { AssetsService } from 'src/app/services/assets.service';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private calendar: NgbCalendar, private assetservice: AssetsService, private authService: AuthService,
    private toastr: ToastrService, private ngxService: NgxUiLoaderService) { }
  model: NgbDateStruct | undefined;

  dashboard!: DashboardDetails;
  supplierName: any

  totalAssetUnderManagement: any;
  assetAwaitingInspection: any;
  totalAssetsDueForReAccreditation: any;
  assetAddedInCurrentMonth: any;
  distinctTypes: any;
  preferredServiceCentre: any;


  SPINNER = SPINNER

  ngOnInit(): void {
    this.ngxService.start();
    this.model = this.calendar.getToday();

    const profileId =  this.authService.profileId// localStorage.getItem('profileId')?.toString();
    this.supplierName = this.authService.name;
    this.assetservice.getDashboardItems(profileId).subscribe(res => {

      this.ngxService.stop();
       this.dashboard = res;
       this.assetAddedInCurrentMonth = res.assetAddedInCurrentMonth;
       this.assetAwaitingInspection = res.assetAwaitingInspection;
       this.totalAssetUnderManagement = res.totalAssetUnderManagement;
       this.assetAddedInCurrentMonth = res.assetAddedInCurrentMonth;
       this.distinctTypes = res.distinctTypes;
       this.preferredServiceCentre = res.preferredServiceCentre;
       this.totalAssetsDueForReAccreditation = res.totalAssetsDueForReAccreditation;
    }, (err: any) => {
      this.ngxService.stop();
      this.toastr.error('System error', 'A system error has occured', {
        timeOut: 3000,
      });
    })
  }

}
