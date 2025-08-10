import type { AllRoomDetails, IRoom } from '~/types/room'
import $axios from './AxiosService'

export default class PlayerService {
  static async join(args: {
    roomCode: string
    playerName: string
    color: string
  }): Promise<AllRoomDetails | null> {
    try {
      const { roomCode, playerName, color } = args
      const payload = {
        playerName,
        color,
      }

      const response = await $axios().post(`/room/${roomCode}/join`, payload)

      return response?.data?.data as AllRoomDetails;
    }
    catch (err) {
      console.log('Errored at player join', err)
      return null
    }
  }

  static async removePlayer(args: {
    roomCode: string
    playerId: string
  }): Promise<{ playerId: string } | null> {
    try {
      const { roomCode, playerId } = args;

      const response = await $axios().delete(`/room/${roomCode}/player/${playerId}`);

      return response?.data?.data as { playerId: string };
    }
    catch (err) {
      console.log('Errored at player remove', err)
      return null
    }
  }
}
