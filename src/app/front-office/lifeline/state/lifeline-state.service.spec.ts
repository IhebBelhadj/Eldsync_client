import { TestBed } from '@angular/core/testing';

import { LifelineStateService } from './lifeline-state.service';

describe('LifelineStateService', () => {
  let service: LifelineStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifelineStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
