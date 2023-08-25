import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeORMConfig } from './configs/typeorm.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/public'),
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
