import appConfig from "app.config";
import connectLmdb from "utils/lmdb";
import { sctDiagSctMedType } from "./sctDxSctMed.type";
export const sctDxSctMed = connectLmdb(
    appConfig.remedDB
).openDB<sctDiagSctMedType>({ name: "sctdx-sctmed" });
