import { TestBed } from '@angular/core/testing';

import { GestionPdfService } from './gestion-pdf.service';

describe('GestionPdfService', () => {
  let service: GestionPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
