import { TestBed } from '@angular/core/testing';

import { LifelineDataService } from './lifeline-data.service';

describe('LifelineDataService', () => {
  let service: LifelineDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifelineDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
