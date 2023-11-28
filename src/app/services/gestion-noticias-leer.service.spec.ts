import { TestBed } from '@angular/core/testing';

import { GestionNoticiasLeerService } from './gestion-noticias-leer.service';

describe('GestionNoticiasLeerService', () => {
  let service: GestionNoticiasLeerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionNoticiasLeerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
