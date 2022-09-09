import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ManagedAssets } from 'src/app/model/dtos/managedassets';
import { ManagedAssetsService } from 'src/app/services/managed-assets.service';

@Component({
  selector: 'app-assetreview',
  templateUrl: './assetreview.component.html',
  styleUrls: ['./assetreview.component.css']
})
export class AssetreviewComponent implements OnInit {
  managedAssets: ManagedAssets = {
    pendingReview: [],
    completedReview: []
  };

  filteredProperty:string = '';
  pendingReviewEmpty: boolean = false;

  constructor(private managedAssetsService: ManagedAssetsService,
    private ngxService: NgxUiLoaderService, private router: Router) { }
  SPINNER = SPINNER

    // searchTerm:string= '';
    // direction:string= 'asc';
    // column:string= 'first';
    // type:string= 'string';

    // setSortParams(param:any){
    // this.direction=param.dir;
    // this.column=param.col;
    // this.type=param.typ;
    // }

  ngOnInit(): void {
    const profileId = Number.parseInt(localStorage.getItem('pid') || '');
    this.ngxService.start();
    this.managedAssetsService.getManagedAssets(profileId).subscribe(res => {
      this.managedAssets = res;
      this.ngxService.stop();
      if(this.managedAssets.pendingReview.length == 0){
        this.pendingReviewEmpty = true;
      }

    })
  }

  goToAddAsset(){
    this.router.navigate(['/addasset'])
  }
}
