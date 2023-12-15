import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    private config: ConfigService,
  ) {}
  getHello(): string {
    const apiKey = this.config.get<string>('API_KEY'); //Una forma simple de tipar la información a recibir <string>
    const name = this.config.get('DATABASE_NAME');

    console.log(this.tasks);
    // return `Hello World! ${this.apiKey}`;
    return `Hello World! ${apiKey} ${name}`;
  }
}
