import { TestBed, async, inject } from '@angular/core/testing';

import { TrainEditGuard } from './train-edit.guard';

describe('TrainEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainEditGuard]
    });
  });

  it('should ...', inject([TrainEditGuard], (guard: TrainEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
