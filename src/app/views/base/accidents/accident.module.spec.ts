import { AccidentModule } from './accident.module';

describe('AccidentModule', () => {
  let accidentModule: AccidentModule;

  beforeEach(() => {
    accidentModule = new AccidentModule();
  });

  it('should create an instance', () => {
    expect(accidentModule).toBeTruthy();
  });
});
