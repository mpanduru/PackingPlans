import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TripActionsComponent} from './trip-actions.component';

xdescribe('TripActionsComponent', () => {
  let component: TripActionsComponent;
  let fixture: ComponentFixture<TripActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripActionsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TripActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
