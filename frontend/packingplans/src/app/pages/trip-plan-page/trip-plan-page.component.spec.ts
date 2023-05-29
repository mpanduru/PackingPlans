import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TripPlanPageComponent} from './trip-plan-page.component';

xdescribe('TripPlanPageComponent', () => {
  let component: TripPlanPageComponent;
  let fixture: ComponentFixture<TripPlanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripPlanPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TripPlanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
