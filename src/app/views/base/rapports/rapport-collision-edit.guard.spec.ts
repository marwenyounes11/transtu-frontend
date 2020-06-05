import { TestBed, async, inject } from '@angular/core/testing';

import { RapportCollisionEditGuard } from './rapport-collision-edit.guard';

describe('RapportCollisionEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RapportCollisionEditGuard]
    });
  });

  it('should ...', inject([RapportCollisionEditGuard], (guard: RapportCollisionEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
