import appConfig from 'app.config';
import { ILmdbScore } from './lmdb.type';
import lmdb from 'lmdb';
import path from 'path';

const db = lmdb.open({
    path: path.resolve(process.cwd(), appConfig.billInScoreDB),
    compression: true,
    encryptionKey: appConfig.billinScoreKey,
    encoding: 'msgpack',
});

const sctIndicationToSctConsumption = db.openDB<ILmdbScore>({
    name: 'sctind-sctcon',
});

const sctBillinScoreDB = { sctIndicationToSctConsumption };

export default sctBillinScoreDB;
