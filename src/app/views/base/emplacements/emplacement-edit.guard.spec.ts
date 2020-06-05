import { TestBed, async, inject } from '@angular/core/testing';

import { EmplacementEditGuard } from './emplacement-edit.guard';

describe('EmplacementEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmplacementEditGuard]
    });
  });

  it('should ...', inject([EmplacementEditGuard], (guard: EmplacementEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});