import { DepartementModule } from './departement.module';

describe('DepartementModule', () => {
  let departementModule: DepartementModule;

  beforeEach(() => {
    departementModule = new DepartementModule();
  });

  it('should create an instance', () => {
    expect(departementModule).toBeTruthy();
  });
});