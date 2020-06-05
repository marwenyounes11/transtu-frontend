import { TestBed, async, inject } from '@angular/core/testing';

import { MetroEditGuard } from './metro-edit.guard';

describe('MetroEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetroEditGuard]
    });
  });

  it('should ...', inject([MetroEditGuard], (guard: MetroEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
