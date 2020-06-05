import { ReceveurModule } from './receveur.module';

describe('ReceveurModule', () => {
  let receveurModule: ReceveurModule;

  beforeEach(() => {
    receveurModule = new ReceveurModule();
  });

  it('should create an instance', () => {
    expect(receveurModule).toBeTruthy();
  });
});