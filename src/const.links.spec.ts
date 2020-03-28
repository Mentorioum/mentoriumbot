import { ConstLink } from './const.link';
import { ConstLinks } from './const.links';
import { RelationEnum } from './relation.enum';

describe('ConstLinks', () => {
   it('create const links', () => {
     let first = new ConstLink(
       'https://github.com/nesterone',
       'Trainee',
       RelationEnum.RECIPIENT
     );
     let second = new ConstLink(
       'https://example.com/some-exercise',
       'Exercise'
     );

     let initial = [first, second];
     let links = new ConstLinks(initial);

     let actual = links.iterate();

     expect(actual !== initial).toBeTruthy();
     expect(actual[0].toJSON()).toEqual(first.toJSON());
     expect(actual[1].toJSON()).toEqual(second.toJSON());
     expect(links.toJSON()).toEqual([
       first.toJSON(),
       second.toJSON()
     ])
   })
});
