import { TestBed } from '@angular/core/testing';

import { OperationCenterService } from './operation-center.service';

describe('OperationCenterService', () => {
  let service: OperationCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
