import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
// import path, { dirname } from 'path';
import { AppService } from './app.service';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

}
