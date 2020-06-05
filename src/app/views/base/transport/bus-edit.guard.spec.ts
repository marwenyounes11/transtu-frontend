import { TestBed, async, inject } from '@angular/core/testing';

import { BusEditGuard } from './bus-edit.guard';

describe('BusEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusEditGuard]
    });
  });

  it('should ...', inject([BusEditGuard], (guard: BusEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
