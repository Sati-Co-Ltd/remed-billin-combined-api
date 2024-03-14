import appConfig from 'app.config';
import { ILmdbSct } from './lmdb.type';
import lmdb from 'lmdb';
import path from 'path';

const sctBillinScoreDB = lmdb
    .open({
        path: path.resolve(process.cwd(), appConfig.billInScoreDB),
        compression: true,
        encryptionKey: appConfig.billinScoreKey,
        encoding: 'msgpack',
    })
    .openDB<ILmdbSct>({ name: 'sctind-sctcon' });

export default sctBillinScoreDB;
