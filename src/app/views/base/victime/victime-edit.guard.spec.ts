import { TestBed, async, inject } from '@angular/core/testing';

import { VictimeEditGuard } from './victime-edit.guard';

describe('VictimeEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VictimeEditGuard]
    });
  });

  it('should ...', inject([VictimeEditGuard], (guard: VictimeEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
