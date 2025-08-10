import { LocalStorageConstants, LocalStorageExpiry } from '~/config/localStorage';
import { ILocalStorageRoom } from '~/types/localStorage';

function isRoomExpired(roomCode: string) {
  const localStorageKey = `${LocalStorageConstants.ROOM}-${roomCode}`;
  const data = localStorage.getItem(localStorageKey);

  if (!data) {
    return true;
  }

  const { expiry } = JSON.parse(data);
  return expiry < Date.now();
}

export function addPlayerIdToLocalStorage(playerId: string) {
  if (!playerId) {
    localStorage.removeItem(LocalStorageConstants.PLAYER_ID);
  } else {
    localStorage.setItem(LocalStorageConstants.PLAYER_ID, JSON.stringify({
      playerId,
      expiry: Date.now() + LocalStorageExpiry.PLAYER_ID,
    }));
  }
}

export function addPlayerNameToLocalStorage(playerName: string) {
  localStorage.setItem(LocalStorageConstants.PLAYER_NAME, playerName);
}

/**
 * For reloading/returning back users to the same room
 * `playerId` should be persisted in the local storage
 */
export function addRoomToLocalStorage(params: { roomCode: string, playerId: string }) {
  const { roomCode, playerId } = params;

  cleanupRoomFromLocalStorage(roomCode);

  const localStorageKey = `${LocalStorageConstants.ROOM}-${roomCode}`;

  localStorage.setItem(localStorageKey, JSON.stringify({
    roomCode,
    playerId,
    expiry: Date.now() + LocalStorageExpiry.ROOM,
  }));
}

function cleanupRoomFromLocalStorage(whiteListedRoomCode: string) {
  const keys = Object.keys(localStorage);

  keys.forEach((key) => {
    if (key.startsWith(LocalStorageConstants.ROOM)) {
      const roomCode = key.split('-')[1];
      if (roomCode !== whiteListedRoomCode && isRoomExpired(roomCode)) {
        localStorage.removeItem(key);
      }
    }
  });
}

export function getPreviousRoomsFromLocalStorage() {
  cleanupRoomFromLocalStorage('');

  const keys = Object.keys(localStorage);
  const previousRoomsMap: Record<string, ILocalStorageRoom> = {};

  keys.forEach((key) => {
    if (key.startsWith(LocalStorageConstants.ROOM)) {
      const roomCode = key.split('-')[1];
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      if (data.roomCode) {
        previousRoomsMap[roomCode] = data;
      }
    }
  });

  return previousRoomsMap;
}
