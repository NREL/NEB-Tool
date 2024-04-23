import { ContactNamePipe } from './contact-name.pipe';

describe('ContactNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ContactNamePipe();
    expect(pipe).toBeTruthy();
  });
});
