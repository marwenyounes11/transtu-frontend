import { TestBed, async, inject } from '@angular/core/testing';

import { AccidentTravailEditGuard } from './accident-travail-edit.guard';

describe('AccidentTravailEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccidentTravailEditGuard]
    });
  });

  it('should ...', inject([AccidentTravailEditGuard], (guard: AccidentTravailEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
