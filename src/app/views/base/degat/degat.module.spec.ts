import { DegatModule } from './degat.module';

describe('DegatModule', () => {
  let degatModule: DegatModule;

  beforeEach(() => {
    degatModule = new DegatModule();
  });

  it('should create an instance', () => {
    expect(degatModule).toBeTruthy();
  });
});