import { DistrictModule } from './district.module';

describe('DistrictModule', () => {
  let districtModule: DistrictModule;

  beforeEach(() => {
    districtModule = new DistrictModule();
  });

  it('should create an instance', () => {
    expect(districtModule).toBeTruthy();
  });
});