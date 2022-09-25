import { Injectable } from '@nestjs/common';
import { constant } from 'lodash';

@Injectable()
export class AppService {
  getHello(): string {
    return constant('Hello World!')();
  }
}
