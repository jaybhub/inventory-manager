import { TestBed } from '@angular/core/testing';

import { FunctionProviderService } from './function-provider.service';

describe('FunctionProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FunctionProviderService = TestBed.get(FunctionProviderService);
    expect(service).toBeTruthy();
  });
});
