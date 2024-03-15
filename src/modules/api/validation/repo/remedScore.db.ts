import appConfig from 'app.config';
import lmdb from 'lmdb';
import path from 'path';
import { ILmdbScore } from 'modules/api/validation/repo/lmdb.type';

const db = lmdb.open({
    path: path.resolve(process.cwd(), appConfig.remedScoreDB),
    compression: true,
    encryptionKey: appConfig.remedScoreKey,
    encoding: 'msgpack',
});

const sctDxToSctMed = db.openDB<ILmdbScore>({ name: 'sctdx-sctmed' });

const sctRemedScoreDB = { sctDxToSctMed };

export default sctRemedScoreDB;
