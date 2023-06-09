import path from 'node:path';
import WebServer from '../lib';

const webServer = new WebServer('TestServer', {
    workingPath: path.resolve(__dirname, '.'),
    logLevel: 'debug',
});
webServer.start_().catch((error) => {
    console.error(error);
});