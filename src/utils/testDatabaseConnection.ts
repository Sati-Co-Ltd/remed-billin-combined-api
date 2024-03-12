import { db } from "repository/db";

const testDatabaseConnection = async (logger = true) => {
    try {
        await db.$connect();
        if (logger) console.info("Database has been connected ✔️");
    } catch (error) {
        console.log(error);
        const _err = error as Error;
        const msg = _err.message;
        ("Can't connect database with current connection string\nplease try to change connection string on ENVIRONMENT ⚠️");
        throw new Error(msg);
    }
};

export default testDatabaseConnection;
