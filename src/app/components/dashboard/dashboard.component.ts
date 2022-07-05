import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { DashboardDetails } from 'src/app/model/dashboard';
import { AssetsService } from 'src/app/services/assets.service';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private calendar: NgbCalendar, private assetservice: AssetsService, private authService: AuthService) { }
  model: NgbDateStruct | undefined;

  dashboard!: DashboardDetails;
  supplierName: any

  ngOnInit(): void {
    this.model = this.calendar.getToday();
    const profileId =  this.authService.profileId// localStorage.getItem('profileId')?.toString();
    this.supplierName = this.authService.name;
    this.assetservice.getDashboardItems(profileId).subscribe(res => {
       this.dashboard = res;
    })
  }

}
