import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDetail } from './entities/userdetail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserDetail]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
  ],
})
export class UserModule { }

