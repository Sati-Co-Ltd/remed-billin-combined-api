import appConfig from 'app.config';
import { ILmdbSct } from './lmdb.type';
import lmdb from 'lmdb';
import path from 'path';

const sctBillinDB = lmdb
    .open({
        path: path.resolve(process.cwd(), appConfig.billInDB),
        compression: true,
        encryptionKey: appConfig.billinKey,
        encoding: 'msgpack',
    })
    .openDB<ILmdbSct>({ name: 'sct-indication-sct-consumption' });

export default sctBillinDB;
