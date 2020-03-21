import { MarkdownLinks } from './markdown.links';

describe('MarkdownLinks', () => {

  it('create with empty content', () => {
    let links = new MarkdownLinks('');
    expect(links.iterate()).toEqual([])
  });

});
