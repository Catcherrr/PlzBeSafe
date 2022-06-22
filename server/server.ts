import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { sequelize } from './models';

// init
const app = express();
dotenv.config();
const PORT: number = parseInt(process.env.PORT as string, 10);
const HOST: string = process.env.HOST || 'localhost';
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, HOST, async () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: ${PORT}🛡️
  ################################################
`);

    await sequelize
        .authenticate()
        .then(async () => {
            console.log('connection success');
        })
        .catch((e) => {
            console.log('TT : ', e);
        });
});

// swagger 설정
const swaggerSpec = YAML.load(path.join(__dirname, './docs/swagger.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

import index from './routers';
app.use(index);
