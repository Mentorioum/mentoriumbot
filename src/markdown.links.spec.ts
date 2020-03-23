import { MarkdownLinks } from './markdown.links';
import { ConstLink } from './const.link';

describe('MarkdownLinks', () => {

  let links, actual, expected;

  it('create with empty content', () => {
    links = new MarkdownLinks('');
    expect(links.iterate()).toEqual([]);
  });

  it('create with one link', () => {
    links = new MarkdownLinks(`
    1. [Chapter 1: What Is JavaScript?](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch1.md) [~3h]
    `);
    expected = new ConstLink(
      'https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch1.md',
      'Chapter 1: What Is JavaScript?',
    ).toJSON();

    actual = links.iterate().pop().toJSON();
    expect(actual).toEqual(expected);
  });

  it('creates with two links', () => {
    links = new MarkdownLinks(`
1. [Chapter 1: What Is JavaScript?](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch1.md)[~3h]
2. [Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch2.md)[~3h]`
    );

    expected = [
      new ConstLink(
        'https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch1.md',
        'Chapter 1: What Is JavaScript?'
      ).toJSON(),
      new ConstLink(
        'https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch2.md',
        'Chapter 2: Surveying JS'
      ).toJSON()
    ];

    actual = links.toJSON();
    expect(actual).toEqual(expected);
  });

});
