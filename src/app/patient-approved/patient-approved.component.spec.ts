import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientApprovedComponent } from './patient-approved.component';

describe('PatientApprovedComponent', () => {
  let component: PatientApprovedComponent;
  let fixture: ComponentFixture<PatientApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
