import { CompanyNamePipe } from './company-name.pipe';

describe('CompanyNamePipe', () => {
  it('create an instance', () => {
    const pipe = new CompanyNamePipe();
    expect(pipe).toBeTruthy();
  });
});
