import { TestBed, async, inject } from '@angular/core/testing';

import { DepotEditGuard } from './depot-edit.guard';

describe('DepotEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepotEditGuard]
    });
  });

  it('should ...', inject([DepotEditGuard], (guard: DepotEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});