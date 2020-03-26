import { Participant } from './participant';
import { ProviderEnum } from './provider.enum';
import * as assert from 'assert';

export class GithubUriParticipant implements Participant {
  private uri: URL;

  constructor(url: URL) {

    this.uri = url;
  }

  login() {
    let pathname = this.uri.pathname;
    let chunks = pathname.split('/');
    let length = chunks.length;

    assert.ok(
      length >= 2  && length <= 3,
      'only user name after origin'
    );
    return chunks[1]
  }
  provider(){
    return ProviderEnum.GITHUB
  }
}
