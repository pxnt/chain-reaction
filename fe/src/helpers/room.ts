import { AllRoomDetails, ICell, RoomState } from '../types/room';
import usePlayers from '../store/players';
import useReactor from '../store/reactor';
import useRoom from '../store/room';
import useGlobalStore from '~/store/global';
import { IPlayer } from '~/types/player';
import eventBus from '~/services/EventBus';
import roomSocketService, { RoomSocketClientEvents } from '~/services/RoomSocketService';
import Constants from '~/config';
import useModal from '~/store/modal';
import { PageNames } from '~/config/route';
import { useRouter } from 'vue-router';

export function allRoomDetailsResponseHandler(response: AllRoomDetails) {
  const $room = useRoom();
  const $players = usePlayers();
  const $reactor = useReactor();

  const currentPlayer = response.leaderboard.players[response.currentPlayerId];

  $room.setRoom(response.room);
  $players.currentPlayerJoined(currentPlayer);
  $players.setLeaderBoard(response.leaderboard);
  $players.setPlayerTurn(response.room.playerIdTurn);
  $reactor.setBoard(response.room.matrix);
}

export function createRoomResponseHandler(response: AllRoomDetails) {
  allRoomDetailsResponseHandler(response);
}

// current player joined
export function joinResponseHandler(response: AllRoomDetails) {
  allRoomDetailsResponseHandler(response);
}

// other players joined
export function playerJoinedResponseHandler(player: IPlayer) {
  const $players = usePlayers();
  $players.addPlayer(player);
}

function resetRoomStores() {
  const $room = useRoom();
  const $players = usePlayers();
  const $reactor = useReactor();

  $room.$reset();
  $players.$reset();
  $reactor.$reset();
}

export function playerRemovedResponseHandler(playerId: string) {
  const $modal = useModal();
  const $players = usePlayers();

  $players.removePlayer(playerId);

  if ($players.currentPlayerId === playerId) {
    $modal.showPlayerRemovedModal();
    resetRoomStores();
  }
}

export function gameStartedResponseHandler() {
  const $room = useRoom();
  $room.setRoomState(RoomState.STARTED);
}

export function addBallResponseHandler(data: { playerId: string, row: number, col: number }) {
  eventBus.$emit('add_ball', data);
}

export function nextPlayerTurnResponseHandler(data: { playerId: string, matrix: ICell[][] }) {
  const $reactor = useReactor();
  const $players = usePlayers();

  if ($reactor.reactionInProgress) {
    setTimeout(() => nextPlayerTurnResponseHandler(data), 1000);
    return;
  }

  $reactor.setBoard(data.matrix);
  $players.setPlayerTurn(data.playerId);
}

export function gameEndedResponseHandler() {
  const $router = useRouter();
  resetRoomStores();
  $router.push(PageNames.Home);
}

export function soc_addBallToAllPlayers(data: { row: number, col: number }) {
  const { row, col } = data;
  const $room = useRoom();
  const $players = usePlayers();

  roomSocketService.emit(RoomSocketClientEvents.ADD_BALL, {
    roomCode: $room.roomCode,
    playerId: $players.currentPlayer?.id,
    row,
    col,
  });
}

export function soc_playerTurnOver(playerId: string) {
  console.log('soc_playerTurnOver', playerId);
  const $room = useRoom();
  const $players = usePlayers();
  const $reactor = useReactor();

  try {
    const lastPlayerTurnColor = $players.playersMap[playerId].color;
    const colorsOrder = Object.values(Constants.Colors)
      .filter(color => Object.values($players.playersMap)
        .some(player => player.color === color));

    const index = colorsOrder.indexOf(lastPlayerTurnColor);
    const nextIndex = (index + 1) % colorsOrder.length;
    const nextColor = colorsOrder[nextIndex];


    const nextPlayer = Object.values($players.playersMap).find((player) => player.color === nextColor);

    $players.setPlayerTurn(nextPlayer?.id || '');

    if (!nextPlayer) {
      return;
    }

    roomSocketService.emit(RoomSocketClientEvents.NEXT_TURN, {
      roomCode: $room.roomCode,
      playerId: nextPlayer.id,
      matrix: $reactor.ballsMatrix,
    });
  } catch (error) {
    debugger;
  }
};
