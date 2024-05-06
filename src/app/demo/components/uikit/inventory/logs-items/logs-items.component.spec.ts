import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsItemsComponent } from './logs-items.component';

describe('LogsItemsComponent', () => {
  let component: LogsItemsComponent;
  let fixture: ComponentFixture<LogsItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogsItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
