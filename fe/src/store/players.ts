import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Role, type ILeaderboard, type IPlayer } from '../types/player'
import { addRoomToLocalStorage } from '~/helpers/localStorage'
import { soc_playerTurnOver } from '~/helpers/room'
import useReactor from './reactor'

const usePlayers = defineStore('players', () => {
  const currentPlayerId = ref('')
  const playersMap = ref<Record<string, IPlayer>>({})
  const playerIdTurn = ref('');
  const $reactor = useReactor();

  const currentPlayer = computed<IPlayer | undefined>(() => playersMap.value[currentPlayerId.value])
  const isHost = computed(() => currentPlayer.value?.role === Role.HOST);
  const isCurrentPlayersTurn = computed(() => playerIdTurn.value === currentPlayerId.value);

  const leaderboard = computed(() => {
    const playerIdToBoxCountMap = $reactor.playerIdToBoxCountMap;
    const leaderboard: Record<string, IPlayer> = {};

    Object.keys(playersMap.value).forEach(playerId => {
      const player = playersMap.value[playerId];
      leaderboard[playerId] = {
        ...player,
        score: playerIdToBoxCountMap[playerId] || 0,
      }
    });

    return leaderboard;
  })

  const totalBoxes = computed(() => $reactor.totalBoxes);

  function setCurrentPlayer(playerId: string) {
    currentPlayerId.value = playerId
    const roomCode = playersMap.value[playerId].roomCode;

    addRoomToLocalStorage({
      roomCode: roomCode,
      playerId: playerId,
    });
  }

  function addPlayer(player: IPlayer) {
    playersMap.value[player.id] = player
  }

  function currentPlayerJoined(player: IPlayer) {
    if (!player) {
      return;
    }

    addPlayer(player);
    setCurrentPlayer(player.id);
  }

  function setLeaderBoard(_leaderboard: ILeaderboard) {
    Object.keys(_leaderboard.players).forEach((playerId) => {
      const player = _leaderboard.players[playerId];
      addPlayer(player)
    }
    );
  }

  function setPlayerTurn(playerId: string) {
    playerIdTurn.value = playerId;
  }

  function setPlayerTurnOver() {
    const lastPlayerIdTurn = playerIdTurn.value;
    soc_playerTurnOver(lastPlayerIdTurn);
  }

  function removePlayer(playerId: string) {
    delete playersMap.value[playerId];
  }

  function $reset() {
    playersMap.value = {};
    playerIdTurn.value = '';
    currentPlayerId.value = '';
  }

  return {
    playersMap,
    playerIdTurn,
    currentPlayerId,

    currentPlayer,
    isHost,
    isCurrentPlayersTurn,
    leaderboard,
    totalBoxes,
    
    addPlayer,
    currentPlayerJoined,
    setLeaderBoard,
    setPlayerTurn,
    setPlayerTurnOver,
    removePlayer,
    $reset,
  }
})

export default usePlayers
