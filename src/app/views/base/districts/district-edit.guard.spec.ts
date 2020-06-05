import { TestBed, async, inject } from '@angular/core/testing';

import { DistrictEditGuard } from './district-edit.guard';

describe('DistrictEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistrictEditGuard]
    });
  });

  it('should ...', inject([DistrictEditGuard], (guard: DistrictEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});