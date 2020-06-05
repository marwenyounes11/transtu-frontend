import { TestBed, async, inject } from '@angular/core/testing';

import { RapportTravailEditGuard } from './rapport-travail-edit.guard';

describe('RapportTravailEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RapportTravailEditGuard]
    });
  });

  it('should ...', inject([RapportTravailEditGuard], (guard: RapportTravailEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
