import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SpecificTripActivitiesComponent} from './specific-trip-activities.component';

xdescribe('SpecificTripActivitiesComponent', () => {
  let component: SpecificTripActivitiesComponent;
  let fixture: ComponentFixture<SpecificTripActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecificTripActivitiesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SpecificTripActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
