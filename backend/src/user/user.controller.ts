import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
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

  @Get(':code')
  findOne(@Param('id') code: number) {
    return this.userService.findOne(+code);
  }

  @Get('/page/:page')
  findMany(@Param('page') page: string) {
    return this.userService.findMany(+page);
  }

  @Patch(':code')
  update(@Param('code') code: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(code, updateUserDto);
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
