import { TestBed } from '@angular/core/testing';

import { FirebaseApiService } from './firebase-api.service';

describe('FirebaseApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseApiService = TestBed.get(FirebaseApiService);
    expect(service).toBeTruthy();
  });
});
