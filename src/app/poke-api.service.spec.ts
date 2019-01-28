import { TestBed } from '@angular/core/testing';

import { PokeApiService } from './poke-api.service';

describe('PokeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokeApiService = TestBed.get(PokeApiService);
    expect(service).toBeTruthy();
  });
});
