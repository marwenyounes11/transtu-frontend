import { TestBed, async, inject } from '@angular/core/testing';

import { RecordEditGuard } from './record-edit.guard';

describe('RecordEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecordEditGuard]
    });
  });

  it('should ...', inject([RecordEditGuard], (guard: RecordEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
