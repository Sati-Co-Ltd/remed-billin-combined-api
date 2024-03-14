import appConfig from 'app.config';
import connectLmdb from 'utils/remed.lmdb';
import { ILmdbSct } from './lmdb.type';
export const sctDxSctMed = connectLmdb(appConfig.remedDB).openDB<ILmdbSct>({
    name: 'sctdx-sctmed',
});
