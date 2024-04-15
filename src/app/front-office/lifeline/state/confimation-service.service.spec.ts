import { TestBed } from '@angular/core/testing';

import { ConfimationServiceService } from './confimation-service.service';

describe('ConfimationServiceService', () => {
  let service: ConfimationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfimationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
