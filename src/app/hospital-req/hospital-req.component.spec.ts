import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalReqComponent } from './hospital-req.component';

describe('HospitalReqComponent', () => {
  let component: HospitalReqComponent;
  let fixture: ComponentFixture<HospitalReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalReqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
