import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToTripComponent } from './add-user-to-trip.component';

describe('AddUserToTripComponent', () => {
  let component: AddUserToTripComponent;
  let fixture: ComponentFixture<AddUserToTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserToTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserToTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
