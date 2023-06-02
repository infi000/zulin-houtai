import { setAMapKey, setAMapVersion } from 'sofa-map';

export const A_MAP_KEY = 'a2c3858bb2e147655b9200cb6785b786';
export const A_MAP_VERSION = '1.4.15';

function loadSofaMap(): void {
  setAMapKey(A_MAP_KEY);
  setAMapVersion(A_MAP_VERSION);
}

export default loadSofaMap;
