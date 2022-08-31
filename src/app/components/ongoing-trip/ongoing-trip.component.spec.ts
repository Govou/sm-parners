import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingTripComponent } from './ongoing-trip.component';

describe('OngoingTripComponent', () => {
  let component: OngoingTripComponent;
  let fixture: ComponentFixture<OngoingTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngoingTripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
