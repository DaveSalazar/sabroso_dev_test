import app from './app';
import logger from './libs/logger';
require('dotenv').config();

const PORT = process.env.PORT || process.env.APP_PORT;

function main() {
    app.listen(PORT, () => logger.info('server running'));
    console.log(`Server on port ${PORT}`)
}

main();
