import cors from 'cors';
import express from 'express';
import apiRouter from 'modules';
import morgan from 'morgan';
import globalErrorHandler from 'middleware/globalErrorHandler';
import testDatabaseConnection from 'utils/testDatabaseConnection';
import cluster from 'cluster';
import { availableParallelism } from 'os';

if (cluster.isPrimary) {
    console.log(`

    .d8888.  .d8b.  d888888b d888888b                                  
    88'  YP d8' \`8b \`~~88~~'   \`88'                                    
    \`8bo.   88ooo88    88       88                                     
      \`Y8b. 88~~~88    88       88                                     
    db   8D 88   88    88      .88.                                    
    \`8888Y' YP   YP    YP    Y888888P                                  
                                                                       
                                                                       
    d8888b. d88888b .88b  d88. d88888b d8888b.                         
    88  \`8D 88'     88'YbdP\`88 88'     88  \`8D                         
    88oobY' 88ooooo 88  88  88 88ooooo 88   88                         
    88\`8b   88~~~~~ 88  88  88 88~~~~~ 88   88                         
    88 \`88. 88.     88  88  88 88.     88  .8D                         
    88   YD Y88888P YP  YP  YP Y88888P Y8888D'                         
                                                                       
                                                                       
    d8888b. d888888b db      db                       d888888b d8b   db
    88  \`8D   \`88'   88      88                         \`88'   888o  88
    88oooY'    88    88      88                          88    88V8o 88
    88~~~b.    88    88      88           C8888D         88    88 V8o88
    88   8D   .88.   88booo. 88booo.                    .88.   88  V888
    Y8888P' Y888888P Y88888P Y88888P                  Y888888P VP   V8P


Sati ReMED & Bill-in API: Copyright ©️ 2024 by Sati Co., Ltd.
`);
}
const processCounts = availableParallelism();
if (cluster.isPrimary && processCounts > 0) {
    // main cluster
    console.log(`Primary process ${process.pid} is running`);

    for (let i = 0; i < processCounts; i++) {
        const worker = cluster.fork();
        console.log(`Start worker: ${worker.process.pid}.`);
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(
            `Worker ${worker.process.pid} died by ${signal}, code ${code}.`
        );
        const newWorker = cluster.fork();
        console.log(
            `Replace worker: ${worker.process.pid} by new worker: ${newWorker.process.pid}.`
        );
    });
} else {
    const app = express();

    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(
        morgan(
            ':date[iso] :method :url :status :res[content-length] - :response-time ms',
            {
                skip: (req, res) => {
                    if (
                        req.url == '/healthcheck' ||
                        req.url === '/health-check'
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                },
            }
        )
    );

    const PORT = 3000;

    app.use('/api', apiRouter);

    app.get('/health(-|)check', (_, res) => res.json({ status: 'OK' }));

    app.use(globalErrorHandler);
    app.listen(PORT, async () => {
        await testDatabaseConnection();
        console.info(`Listening on port ${PORT}`);
        console.info(`URL: http://localhost:${PORT}`);
    });
}
