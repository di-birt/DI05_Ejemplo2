import { TestBed } from '@angular/core/testing';

import { GestionStorageService } from './gestion-storage.service';

describe('GestionStorageService', () => {
  let service: GestionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
