import { ILeaderboard, IPlayer } from './player'

export enum RoomState {
  WAITING = 'waiting',
  STARTED = 'started',
  ENDED = 'ended',
}

export interface ICell {
  playerId: string
  count: number
  capacity: number
}

export interface IRoom {
  code: string
  rows: number
  cols: number
  state: RoomState
  matrix: ICell[][]
  totalPlayers: number
  playerIdTurn: string
}

export interface AllRoomDetails {
  room: IRoom
  currentPlayerId: string
  leaderboard: ILeaderboard
};