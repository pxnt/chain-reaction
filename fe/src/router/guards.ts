import { RouteLocationNormalized } from 'vue-router';
import { PageNames } from '~/config/route';
import { allRoomDetailsResponseHandler, joinResponseHandler } from '~/helpers/room';
import RoomService from '~/services/RoomService';
import useGlobalStore from '~/store/global';
import usePlayers from '~/store/players';
import useRoom from '~/store/room';
import { isValidRoomCode } from '~/utils/misc';

export function checkPlayerName(to: RouteLocationNormalized) {
  const roomCode = to.params.roomCode as string;
  const $global = useGlobalStore();

  if (!isValidRoomCode(roomCode)) {
    return { name: PageNames.Home };
  }

  if(!$global.playerName) {
    return {
      name: PageNames.PlayerNameScreen,
      params: { roomCode: to.params.roomCode },
    };
  }

  return true;
}

export async function checkRoomCode(to: RouteLocationNormalized) {
  const roomCode = to.params.roomCode as string;

  if (!isValidRoomCode(roomCode)) {
    return { name: PageNames.Home};
  }

  const isValidRoomDetails = await RoomService.isValid({
    roomCode: to.params.roomCode as string,
  });

  if (!isValidRoomDetails || !isValidRoomDetails.room) {
    return { name: PageNames.Home };
  }

  const $global = useGlobalStore();
  const isPlayerNameAvailable = $global.playerName;
  const isPreviousRoom = $global.getPreviousRoom(roomCode);

  if (isPlayerNameAvailable || isPreviousRoom) {
    return { name: PageNames.Room, params: { roomCode: to.params.roomCode } };
  }

  return true;
}

export async function beforeJoinRoom(to: RouteLocationNormalized) {
  const roomCode = to.params.roomCode as string;
  const $global = useGlobalStore();
  const $players = usePlayers();

  if (!isValidRoomCode(roomCode)) {
    return { name: PageNames.Home };
  }

  // if created room, then redirect to lobby
  if($players.currentPlayer?.roomCode === roomCode) {
    return true;
  }

  const previousRoom = $global.getPreviousRoom(roomCode);
  const isPlayerNameAvailable = $global.playerName;

  if (!isPlayerNameAvailable && !previousRoom) {
    return { name: PageNames.PlayerNameScreen, params: { roomCode: to.params.roomCode } };
  }

  const isValidRoomDetails = await RoomService.isValid({
    roomCode: to.params.roomCode as string,
    ...(previousRoom ? { playerId: previousRoom.playerId } : {}),
  });

  if (!isValidRoomDetails || !isValidRoomDetails.room) {
    return { name: PageNames.Home };
  }
  if (!isValidRoomDetails.player) {
    if (!isPlayerNameAvailable) {
      return { name: PageNames.PlayerNameScreen, params: { roomCode: to.params.roomCode } };
    }

    const allRoomDetails = await RoomService.join({
      playerName: $global.playerName,
      roomCode: to.params.roomCode as string,
    });
    
    if (!allRoomDetails) {
      return { name: PageNames.Home };
    }

    joinResponseHandler(allRoomDetails);
  } else {
    const response = await RoomService.getAllRoomDetails(roomCode, previousRoom.playerId);
    if (response) {
      allRoomDetailsResponseHandler(response);
    }
  }

  return true;
}