import { Participant, ParticipantOutput } from './participant';

export class ConstParticipant implements Participant {
  private _login: string;
  private _provider: string;

  constructor(login, provider) {
    this._login = login;
    this._provider = provider;
  }

  login(): string  {
    return this._login;
  }
  provider(): string {
    return this._provider
  }

  toJSON(): ParticipantOutput {
    return {
      login: this.login(),
      provider: this.provider()
    };
  }


}
