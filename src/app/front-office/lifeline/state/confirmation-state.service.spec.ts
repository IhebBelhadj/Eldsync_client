import { TestBed } from '@angular/core/testing';

import { ConfirmationStateService } from './confirmation-state.service';

describe('ConfirmationStateService', () => {
  let service: ConfirmationStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
