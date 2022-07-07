import { Component, OnInit } from '@angular/core';
import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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

  constructor(config: NgbAccordionConfig,private router: Router, private managedAssetsService: ManagedAssetsService, private ngxService: NgxUiLoaderService) { config.type = 'dark' }

  managedAssets: ManagedAssets = {
    pendingReview: [],
    completedReview: []
  };

  pendingReviewEmpty: boolean = false;
  completedReviewEmpty: boolean = false;
  allEmpty: boolean = false;

  SPINNER = SPINNER

  ngOnInit(): void {
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
  }

  addNewAsset(){
    this.router.navigate(['/addasset']);
  }


}
