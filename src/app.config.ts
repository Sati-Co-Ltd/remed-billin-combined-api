import "dotenv/config";

const appConfig = {
    remedDB: process.env.REMED_DB ?? "./volume/remed-mdb/",
    billInDB: process.env.BILL_IN_DB ?? "./volume/bill-in-mdb/",
    lmbKey: process.env.REMED_MDB_KEY || "J9pQsRvX2w5yZ8aB3tN6mH7cU1o0lF4e",
};

export default appConfig;
