import { TestBed } from '@angular/core/testing';
import { ContactNameDisplayPipe } from './contact-name-display.pipe';
import { ContactNamePipe } from './contact-name.pipe';

describe('ContactNamePipe', () => {
  let pipe: ContactNamePipe;
  let contactNameDisplayPipe: ContactNameDisplayPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactNameDisplayPipe]
    });
    contactNameDisplayPipe = TestBed.inject(ContactNameDisplayPipe);
  })
  it('create an instance', () => {
    pipe = new ContactNamePipe(contactNameDisplayPipe);
    expect(pipe).toBeTruthy();
  });
});
