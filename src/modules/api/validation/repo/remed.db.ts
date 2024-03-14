import appConfig from 'app.config';
import { ILmdbSct } from './lmdb.type';
import lmdb from 'lmdb';
import path from 'path';

const sctRemedDB = lmdb
    .open({
        path: path.resolve(process.cwd(), appConfig.remedDB),
        compression: true,
        encryptionKey: appConfig.remedKey,
        encoding: 'msgpack',
    })
    .openDB<ILmdbSct>({ name: 'sctdx-sctmed' });

export default sctRemedDB;
