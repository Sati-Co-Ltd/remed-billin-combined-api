import 'dotenv/config';

const appConfig = {
    remedDB: process.env.REMED_DB ?? './volume/remed-mdb/',
    remedScoreDB: process.env.REMED_SCORE_DB ?? './volume/remed-score-mdb/',
    billInDB: process.env.BILL_IN_DB ?? './volume/bill-in-mdb/',
    billInScoreDB:
        process.env.BILL_IN_SCORE_DB ?? './volume/bill-in-score-mdb/',
    appDB: process.env.APP_DB ?? './volume/app-mdb',
    remedKey: process.env.REMED_KEY || 'J9pQsRvX2w5yZ8aB3tN6mH7cU1o0lF4e',
    remedScoreKey:
        process.env.REMED_SCORE_KEY || 'bd2ef91547cd45479c271396f83c4a0d',
    billinKey: process.env.BILLIN_KEY || 'uCjwR9N48UXqUKrDBbB9AhuC5CPJrKuY',
    billinScoreKey:
        process.env.BILLIN_SCORE_KEY || 'bd2ef91547cd45479c271396f83c4a0d',
};

export default appConfig;
