import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowerHomepageComponent } from './lower-homepage.component';

describe('LowerHomepageComponent', () => {
  let component: LowerHomepageComponent;
  let fixture: ComponentFixture<LowerHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LowerHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LowerHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
