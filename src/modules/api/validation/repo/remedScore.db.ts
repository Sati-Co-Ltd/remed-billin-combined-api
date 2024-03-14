import appConfig from 'app.config';
import lmdb from 'lmdb';
import path from 'path';
import { ILmdbScore } from 'modules/api/validation/repo/lmdb.type';

const sctRemedScoreDB = lmdb
    .open({
        path: path.resolve(process.cwd(), appConfig.remedScoreDB),
        compression: true,
        encryptionKey: appConfig.remedScoreKey,
        encoding: 'msgpack',
    })
    .openDB<ILmdbScore>({ name: 'sctdx-sctmed' });

export default sctRemedScoreDB;
