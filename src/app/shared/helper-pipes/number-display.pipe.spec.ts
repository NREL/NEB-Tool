import { NumberDisplayPipe } from './number-display.pipe';

describe('NumberDisplayPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberDisplayPipe();
    expect(pipe).toBeTruthy();
  });
});
