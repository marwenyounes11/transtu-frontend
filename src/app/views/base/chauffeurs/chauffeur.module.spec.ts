import { ChauffeurModule } from './chauffeur.module';

describe('ChauffeurModule', () => {
  let chauffeurModule: ChauffeurModule;

  beforeEach(() => {
    chauffeurModule = new ChauffeurModule();
  });

  it('should create an instance', () => {
    expect(chauffeurModule).toBeTruthy();
  });
});
