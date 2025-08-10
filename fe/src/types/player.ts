export enum Role {
  HOST = 'host',
  PLAYER = 'player',
}

export interface IPlayer {
  id: string
  name: string
  color: string
  roomCode: string
  role: Role
  score: number,
}

export interface ILeaderboard {
  roomCode: string
  players: Record<string, IPlayer>
}
