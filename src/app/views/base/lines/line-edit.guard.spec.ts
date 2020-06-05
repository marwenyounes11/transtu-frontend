import { TestBed, async, inject } from '@angular/core/testing';

import { LineEditGuard } from './line-edit.guard';

describe('LineEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LineEditGuard]
    });
  });

  it('should ...', inject([LineEditGuard], (guard: LineEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
