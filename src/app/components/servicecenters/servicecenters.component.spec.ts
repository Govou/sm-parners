import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecentersComponent } from './servicecenters.component';

describe('ServicecentersComponent', () => {
  let component: ServicecentersComponent;
  let fixture: ComponentFixture<ServicecentersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicecentersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicecentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
