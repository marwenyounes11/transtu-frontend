import { TestBed, async, inject } from '@angular/core/testing';

import { DepartementEditGuard } from './departement-edit.guard';

describe('DepartementEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepartementEditGuard]
    });
  });

  it('should ...', inject([DepartementEditGuard], (guard: DepartementEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});