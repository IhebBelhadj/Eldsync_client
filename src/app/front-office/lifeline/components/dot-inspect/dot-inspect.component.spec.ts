import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotInspectComponent } from './dot-inspect.component';

describe('DotInspectComponent', () => {
  let component: DotInspectComponent;
  let fixture: ComponentFixture<DotInspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotInspectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DotInspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
