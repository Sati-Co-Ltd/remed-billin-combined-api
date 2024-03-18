import appConfig from 'app.config';
import { ILmdbSct } from './lmdb.type';
import lmdb from 'lmdb';
import path from 'path';

const db = lmdb.open({
    path: path.resolve(process.cwd(), appConfig.remedDB),
    compression: true,
    encryptionKey: appConfig.remedKey,
    encoding: 'msgpack',
});

const sctDxToSctMed = db.openDB<ILmdbSct>({ name: 'sctdx-sctmed' });
const sctMedToSctDx = db.openDB<ILmdbSct>({ name: 'sctmed-sctdx' });

const sctRemedDB = {
    sctDxToSctMed,
    sctMedToSctDx,
};

export default sctRemedDB;
