import { TestBed, async, inject } from '@angular/core/testing';

import { AccidentCollisionEditGuard } from './accident-collision-edit.guard';

describe('AccidentCollisionEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccidentCollisionEditGuard]
    });
  });

  it('should ...', inject([AccidentCollisionEditGuard], (guard: AccidentCollisionEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
