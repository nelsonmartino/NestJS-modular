// import { HttpModule, HttpService } from '@nestjs/common'; //* useFactory hasta nest versión 7
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios'; //* useFactory a partir de nest versión 8
import { lastValueFrom } from 'rxjs'; //* useFactory a partir de nest versión 8 para reemplazar .toPromise()
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';

//* Lo saco de acá para llevarlo a database.module y utilizarlo como módulo global
// const API_KEY = 'xyz1234';
// const API_KEY_PROD = '123PROD9823';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true, //* Otra manera de hacer global un recurso
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
