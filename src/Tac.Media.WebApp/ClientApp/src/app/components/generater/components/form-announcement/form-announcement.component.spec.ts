import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnnouncementComponent } from './form-announcement.component';

describe('FormAnnouncementComponent', () => {
  let component: FormAnnouncementComponent;
  let fixture: ComponentFixture<FormAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAnnouncementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
