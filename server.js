const app = require('./app');
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000;

const isEnvProd = process.env.ENVIRONMENT == "Production"? true : false;

async function main() {
    await mongoose.connect(process.env.DATABASE_URL, { autoIndex: !isEnvProd });
    app.listen(PORT, () => {
        console.log(`Server is up and running on ${PORT} ...`);
    });
}

main()