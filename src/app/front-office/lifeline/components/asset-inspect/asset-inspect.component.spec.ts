import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetInspectComponent } from './asset-inspect.component';

describe('AssetInspectComponent', () => {
  let component: AssetInspectComponent;
  let fixture: ComponentFixture<AssetInspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetInspectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetInspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
