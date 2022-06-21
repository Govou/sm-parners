import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { addAsset } from 'src/app/model/addasset';



@Component({
  selector: 'app-addasset',
  templateUrl: './addasset.component.html',
  styleUrls: ['./addasset.component.css']
})
export class AddassetComponent implements OnInit {

  

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.page = 'asset'
  }
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
}
