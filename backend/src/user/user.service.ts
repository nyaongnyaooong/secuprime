import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDetail } from './entities/userdetail.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserDetail)
    private readonly userDetailRepository: Repository<UserDetail>
  ) { }

  async create(createUserDto: CreateUserDto) {
    // db에 중복된 guest code가 있는지 확인
    const duplicateUser = await this.userRepository.findOne({
      where: { guest_code: createUserDto.guest_code }
    });
    // 중복이 존재하면 Error
    if (duplicateUser) throw new HttpException('duplicate guest code', HttpStatus.BAD_REQUEST);

    const user: User = {
      guest_code: createUserDto.guest_code,
      guest_name: createUserDto.guest_name,
      guest_birth: createUserDto.guest_birth,
    }

    const userDetail: UserDetail = {
      guest_code: createUserDto.guest_code,
      guest_hp: createUserDto.guest_hp,
      guest_addr: createUserDto.guest_addr,
      guest_mail: createUserDto.guest_mail,
    }
    await this.userRepository.save(user);
    await this.userDetailRepository.save(userDetail);

    return createUserDto;
  }

  async findAll() {
    const user = await this.userRepository.find();
    const userDetail = await this.userDetailRepository.find();
    return {
      user,
      userDetail
    }
  }

  async update(code: number, updateUserDto: UpdateUserDto) {
    // 수정 요청한 data가 있는지 확인
    const existUser = await this.userRepository.findOne({
      where: { guest_code: code }
    })
    if (!existUser) throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST)

    // 수정 후의 유저 코드가 중복되었는지 확인
    const duplicateUser = await this.userRepository.findOne({
      where: { guest_code: updateUserDto.guest_code }
    })
    console.log(duplicateUser, code, updateUserDto.guest_code)
    if (duplicateUser && code !== updateUserDto.guest_code) throw new HttpException('user code already using', HttpStatus.BAD_REQUEST)

    // detail data 받아오기
    const existUserDetail = await this.userDetailRepository.findOne({
      where: { guest_code: code }
    })

    const updatedUserDto: CreateUserDto = Object.assign(Object.assign(existUser, existUserDetail), updateUserDto)

    const updatedUser: User = {
      guest_code: updatedUserDto.guest_code,
      guest_name: updatedUserDto.guest_name,
      guest_birth: updatedUserDto.guest_birth,
    }

    const updatedUserDetail: UserDetail = {
      guest_code: updatedUserDto.guest_code,
      guest_hp: updatedUserDto.guest_hp,
      guest_addr: updatedUserDto.guest_addr,
      guest_mail: updatedUserDto.guest_mail,
    }

    await this.userRepository.delete(code);
    await this.userDetailRepository.delete(code);

    await this.userRepository.save(updatedUser);
    await this.userDetailRepository.save(updatedUserDetail);
  }

  async remove(code: number) {
    await this.userRepository.delete(code)
    await this.userDetailRepository.delete(code)
  }

  async reset() {
    const { data: initialData } = await axios.get('http://secuprime.com/recruit/202308_testdata.php')
    if (!initialData) throw new Error('api server error')
    const { cust: users, cust_detail: usersDetail }: { cust: User[], cust_detail: UserDetail[] } = initialData.data[0]
    await this.userRepository.clear();
    await this.userDetailRepository.clear();

    // const usersToInsert = users.map((user, usersIndex) => {
    //   const userDetail = usersDetail[usersIndex]
    //   const instanceArray = [];
    //   instanceArray.push(this.userRepository.create(user))
    //   instanceArray.push(this.userDetailRepository.create(userDetail))
    //   return instanceArray
    // });

    const usersToInsert = users.map(user => this.userRepository.create(user));
    await this.userRepository.save(usersToInsert);

    const usersDetailToInsert = usersDetail.map(userDetail => this.userDetailRepository.create(userDetail));
    await this.userDetailRepository.save(usersDetailToInsert);

    return `This action reset the db`
  }
}
