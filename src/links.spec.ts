import { MarkdownLinks } from './MarkdownLinks';

describe('Links', () => {


  it('init links', () => {
    let links = new MarkdownLinks();

    expect(links.iterate()).toEqual([])
  })

});
