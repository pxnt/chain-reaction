
import type { AllRoomDetails, IRoom } from '../types/room'
import $axios from './AxiosService'

export default class RoomService {
  static async createAndJoin(args: {
    playerName: string,
    rows: number,
    cols: number,
  }): Promise<AllRoomDetails | null> {
    try {
      const { playerName, rows, cols } = args
      const payload = {
        playerName,
        rows,
        cols,
      }

      const response = await $axios().post('/room', payload)
      return response?.data?.data as AllRoomDetails;
    }
    catch (err) {
      console.log('Errored at createAndJoin', err)
      return null
    }
  }

  static async join(args: {
    playerName: string,
    roomCode: string,
  }): Promise<AllRoomDetails | null> {
    try {
      const { playerName, roomCode } = args
      const payload = {
        playerName,
        roomCode,
      }

      const response = await $axios().post('/join', payload)
      return response?.data?.data as AllRoomDetails;
    }
    catch (err) {
      console.log('Errored at createAndJoin', err)
      return null
    }
  }

  static async getAllRoomDetails(roomCode: string, playerId: string) {
    try {
      const response = await $axios().get(`/room/${roomCode}/details?playerId=${playerId}`)
      return response?.data?.data as AllRoomDetails;
    }
    catch (err) {
      console.log('Errored at getRoom', err)
      return null
    }
  }

  static async isValid(args: { roomCode: string, playerId?: string }) {
    try {
      const { roomCode, playerId } = args

      // const response = await $axios().get(`/room-details/is-valid?roomCode=${roomCode}&playerId=${playerId}`)
      const response = await $axios().get(`/room-details/is-valid`, {
        params: {
          roomCode,
          playerId,
        },
      })
      return response?.data?.data as { room: boolean, player: boolean };
    }
    catch (err) {
      console.log('Errored at getRoom', err)
      return null
    }
  }

  static async start(args: {
    roomCode: string,
  }): Promise<{ room: IRoom } | null> {
    try {
      const { roomCode } = args

      const response = await $axios().post(`/room/${roomCode}/start`)
      return response?.data?.data as { room: IRoom };
    }
    catch (err) {
      console.log('Errored at createAndJoin', err)
      return null
    }
  }

  static async end(args: {
    roomCode: string,
  }): Promise<{ room: IRoom } | null> {
    try {
      const { roomCode } = args
      const response = await $axios().delete(`/room/${roomCode}`)
      return response?.data?.data as { room: IRoom };
    }
    catch (err) {
      console.log('Errored at end', err)
      return null
    }
  }
}
