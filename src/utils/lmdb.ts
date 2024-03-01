import { open } from "lmdb";
import appConfig from "../app.config";
import path from "path";
export const connectLmdb = (lmdbPath: string) => {
    const resolvedPath = path.resolve(process.cwd(), lmdbPath);

    console.info(resolvedPath);

    const myDB = open({
        path: resolvedPath,
        compression: true,
        encryptionKey: appConfig.lmbKey,
        encoding: "msgpack",
    });
    return myDB;
};

export default connectLmdb;
