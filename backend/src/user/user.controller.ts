import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+code, updateUserDto);
  }

  @Delete(':code')
  remove(@Param('code') code: number) {
    return this.userService.remove(+code);
  }

  @Post('/reset')
  reset() {
    return this.userService.reset();
  }
}
