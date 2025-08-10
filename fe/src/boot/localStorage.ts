import { LocalStorageConstants } from '~/config/localStorage';
import { getPreviousRoomsFromLocalStorage } from '~/helpers/localStorage';
import useGlobalStore from '~/store/global';

export function loadLocalStorage() {
  const $global = useGlobalStore();

  const playerName = localStorage.getItem(LocalStorageConstants.PLAYER_NAME);
  $global.setPlayerName(playerName || '');

  const previousRooms = getPreviousRoomsFromLocalStorage();
  $global.setPreviousRooms(previousRooms);
}