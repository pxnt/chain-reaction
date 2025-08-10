import Constants from '../config'

function getRandomNumberInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function getPlayerColor() {
  const colorIndex = ~~getRandomNumberInRange(0, Constants.PLAYER_COLORS.length)
  return Constants.PLAYER_COLORS[colorIndex]
}

export function isValidRoomCode(roomCode: string) {
  const regex = new RegExp('^[a-zA-Z0-9]*$');
  return roomCode.length === Constants.ROOM_CODE_LENGTH && regex.test(roomCode);
}