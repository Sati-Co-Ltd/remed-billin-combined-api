import appConfig from 'app.config';
import { ILmdbSct } from './lmdb.type';
import lmdb from 'lmdb';
import path from 'path';

const db = lmdb.open({
    path: path.resolve(process.cwd(), appConfig.billInDB),
    compression: true,
    encryptionKey: appConfig.billinKey,
    encoding: 'msgpack',
});

const sctIndicationToSctConsumption = db.openDB<ILmdbSct>({
    name: 'sct-indication-sct-consumption',
});

const sctConsumptionToSctIndication = db.openDB<ILmdbSct>({
    name: 'sct-consumption-sct-indication',
});
const sctBillinDB = {
    sctIndicationToSctConsumption,
    sctConsumptionToSctIndication,
};

export default sctBillinDB;
