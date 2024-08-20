import { ContactNameDisplayPipe } from './contact-name-display.pipe';

describe('ContactDisplayPipe', () => {
  it('create an instance', () => {
    const pipe = new ContactNameDisplayPipe();
    expect(pipe).toBeTruthy();
  });
});
