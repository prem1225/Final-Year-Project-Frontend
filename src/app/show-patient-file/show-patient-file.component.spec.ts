import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPatientFileComponent } from './show-patient-file.component';

describe('ShowPatientFileComponent', () => {
  let component: ShowPatientFileComponent;
  let fixture: ComponentFixture<ShowPatientFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPatientFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPatientFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
