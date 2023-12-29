import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb'; //* Para hacer conexión a la base de datos
import { ConfigType } from '@nestjs/config';
import config from '../config';

const API_KEY = 'xyz1234';
const API_KEY_PROD = '123PROD9823';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY, //Envía el valor condicional al entorno
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const {connection, user, password, host,dbName} = configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}/`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO'],
})
export class DatabaseModule {}
