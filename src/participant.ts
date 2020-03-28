export interface ParticipantOutput {
  login: string,
  provider: string
}

export interface Participant {
  login(): string
  provider(): string
  toJSON(): ParticipantOutput
}
