import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NURSEComponent } from './nurse.component';

describe('NURSEComponent', () => {
  let component: NURSEComponent;
  let fixture: ComponentFixture<NURSEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NURSEComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NURSEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
