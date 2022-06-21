import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendar} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private calendar: NgbCalendar) { }
  model: NgbDateStruct | undefined;


  ngOnInit(): void {
    this.model = this.calendar.getToday();  
  }

}
