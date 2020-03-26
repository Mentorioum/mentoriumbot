import { GithubUriParticipant } from './github.uri.participant';
import { ProviderEnum } from './provider.enum';

describe('github participant', () => {

  it('creates participant from url', () => {
     const participant = new GithubUriParticipant(
       new URL('http://githib.com/nesterone')
     );

     expect(participant.login()).toEqual('nesterone');
     expect(participant.provider()).toEqual(ProviderEnum.GITHUB);
  });

  it('creates participant from url with slash in the end', () => {
    const participant = new GithubUriParticipant(
      new URL('http://githib.com/nesterone/')
    );

    expect(participant.login()).toEqual('nesterone');
    expect(participant.provider()).toEqual(ProviderEnum.GITHUB);
  });

  it('creates participant from url without user login', () => {
    const participant = new GithubUriParticipant(
      new URL('http://githib.com/')
    );

    expect(participant.login()).toEqual('');
    expect(participant.provider()).toEqual(ProviderEnum.GITHUB);
  });

});
