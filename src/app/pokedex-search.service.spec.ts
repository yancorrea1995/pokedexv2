import { TestBed } from '@angular/core/testing';

import { PokedexSearchService } from './services/PokedexSearch/pokedex-search.service';

describe('PokedexSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokedexSearchService = TestBed.get(PokedexSearchService);
    expect(service).toBeTruthy();
  });
});
