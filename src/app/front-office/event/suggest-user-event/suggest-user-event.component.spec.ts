import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestUserEventComponent } from './suggest-user-event.component';

describe('SuggestUserEventComponent', () => {
  let component: SuggestUserEventComponent;
  let fixture: ComponentFixture<SuggestUserEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestUserEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuggestUserEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
