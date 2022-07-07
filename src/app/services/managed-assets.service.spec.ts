import { TestBed } from '@angular/core/testing';

import { ManagedAssetsService } from './managed-assets.service';

describe('ManagedAssetsService', () => {
  let service: ManagedAssetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagedAssetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
