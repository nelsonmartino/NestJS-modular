import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Db } from 'mongodb';

//*Para uso de tipado en config
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    @Inject('MONGO') private database: Db,
    // private config: ConfigService,
    //*Tipado en config
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    // const apiKey = this.config.get<string>('API_KEY'); //Una forma simple de tipar la información a recibir <string>
    // const name = this.config.get('DATABASE_NAME');
    //* Tipado en config
    const apiKey = this.configService.apiKey;
    const name = this.configService.database.name;

    console.log(this.tasks);
    // return `Hello World! ${this.apiKey}`;
    return `Hello World! ${apiKey} ${name}`;
  }
  getTasks() {
    const taskCollection = this.database.collection('tasks');
    return taskCollection.find().toArray(); 
  }
}
