import { Component, OnInit } from '@angular/core';
import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css'],
  providers: [NgbAccordionConfig]
})
export class AssetsComponent implements OnInit {

  constructor(config: NgbAccordionConfig) { config.type = 'dark' }

  ngOnInit(): void {

  }

  
}
