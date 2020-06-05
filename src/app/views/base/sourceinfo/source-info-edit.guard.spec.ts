import { TestBed, async, inject } from '@angular/core/testing';

import { SourceInfoEditGuard } from './source-info-edit.guard';

describe('SourceInfoEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SourceInfoEditGuard]
    });
  });

  it('should ...', inject([SourceInfoEditGuard], (guard: SourceInfoEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
