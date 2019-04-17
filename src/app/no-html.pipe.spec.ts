import { NoHTMLPipe } from './no-html.pipe';

describe('NoHTMLPipe', () => {
  it('create an instance', () => {
    const pipe = new NoHTMLPipe();
    expect(pipe).toBeTruthy();
  });
});
