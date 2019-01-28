import { TestBed } from '@angular/core/testing';

import { ToggleToolsService } from './toggle-tools.service';

describe('ToggleToolsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToggleToolsService = TestBed.get(ToggleToolsService);
    expect(service).toBeTruthy();
  });
});
