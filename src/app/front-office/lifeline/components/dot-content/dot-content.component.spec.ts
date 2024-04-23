import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotContentComponent } from './dot-content.component';

describe('DotContentComponent', () => {
  let component: DotContentComponent;
  let fixture: ComponentFixture<DotContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DotContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
