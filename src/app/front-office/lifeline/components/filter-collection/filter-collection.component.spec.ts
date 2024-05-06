import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCollectionComponent } from './filter-collection.component';

describe('FilterCollectionComponent', () => {
  let component: FilterCollectionComponent;
  let fixture: ComponentFixture<FilterCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterCollectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
