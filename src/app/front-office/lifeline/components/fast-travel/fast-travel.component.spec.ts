import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastTravelComponent } from './fast-travel.component';

describe('FastTravelComponent', () => {
  let component: FastTravelComponent;
  let fixture: ComponentFixture<FastTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FastTravelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FastTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
