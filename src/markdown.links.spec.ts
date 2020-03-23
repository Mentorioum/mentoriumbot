import { MarkdownLinks } from './markdown.links';
import { ConstLink } from './const.link';

describe('MarkdownLinks', () => {

  let links;

  it('create with empty content', () => {
    links = new MarkdownLinks('');
    expect(links.iterate()).toEqual([])
  });

  it('create with one link', () => {
    links = new MarkdownLinks(`
    1. [Chapter 1: What Is JavaScript?](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch1.md) [~3h]
    `);
    let expected = new ConstLink(
      'https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch1.md',
      'Chapter 1: What Is JavaScript?'
    ).toJSON();

    let actual = links.iterate().pop().toJSON();
    expect(actual).toEqual(expected);
  });

});
