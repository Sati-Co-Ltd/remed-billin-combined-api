import appConfig from "app.config";
import connectLmdb from "utils/lmdb";
import { sctProcedureSctDeviceType } from "./sctProcedureSctDevice.type";

export const sctProcedureSctDevice = connectLmdb(
    appConfig.remedDB
).openDB<sctProcedureSctDeviceType>({
    name: "sctdx-sctmed",
});
