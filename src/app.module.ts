// import { HttpModule, HttpService } from '@nestjs/common'; //* useFactory hasta nest versión 7
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios'; //* useFactory a partir de nest versión 8
import * as Joi from 'joi'; //* Para hacer tipado de variables de entorno
// import { MongoClient } from 'mongodb'; //* Para hacer conexión a la base de datos

import { lastValueFrom } from 'rxjs'; //* useFactory a partir de nest versión 8 para reemplazar .toPromise()
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { environments } from './environments';
//*Tipado en config
import config from './config';

// const uri =
//   'mongodb+srv://nelsonmartino:dJng3BRJzKsJZSi5@cluster0.ubsvkzu.mongodb.net/';

// //! Conexión a base de datos mongo con driver oficial de mongo
// const client = new MongoClient(uri);
// async function run() {
//   await client.connect();
//   const database = client.db('test');
//   const taskCollection = database.collection('tasks');
//   const tasks = await taskCollection.find().toArray();
//   console.log(tasks);
// }
// run();

//* Lo saco de acá para llevarlo a database.module y utilizarlo como módulo global
// const API_KEY = 'xyz1234';
// const API_KEY_PROD = '123PROD9823';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '.env',
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      //*Tipado en config
      load: [config],
      isGlobal: true, //* Otra manera de hacer global un recurso
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    //* Lo saco de acá para llevarlo a database.module y utilizarlo como módulo global
    // {
    //   provide: 'API_KEY',
    //   useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY, //Envía el valor condicional al entorno
    // },
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        //* Hasta versión 7 de nest
        // const tasks = await http
        //   .get('https://jsonplaceholder.typicode.com/todos')
        //   .toPromise();
        //* A partir de versión 8 de nest
        const request = http.get('https://jsonplaceholder.typicode.com/todos');
        const tasks = await lastValueFrom(request);
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
