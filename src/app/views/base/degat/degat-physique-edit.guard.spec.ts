import { TestBed, async, inject } from '@angular/core/testing';

import { DegatMaterielEditGuard } from './degat-materiel-edit.guard';

describe('DegatMaterielEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DegatMaterielEditGuard]
    });
  });

  it('should ...', inject([DegatMaterielEditGuard], (guard: DegatMaterielEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});