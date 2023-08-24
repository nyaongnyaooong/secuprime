import { Injectable } from '@nestjs/common';
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
    private readonly userDetailRepository: Repository<UserDetail>
  ) { }

  async create(createUserDto: CreateUserDto) {
    // db에 중복된 guest code가 있는지 확인
    const duplicateUser = await this.userRepository.findOne({
      where: { guest_code: createUserDto.guest_code }
    });
    // 중복이 존재하면 Error
    if (!duplicateUser) throw new Error('duplicate guest code');

    return await this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findMany(page: number) {
    return `This action returns a user data of #${page} page`;
  }

  async update(code: number, updateUserDto: UpdateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { guest_code: code }
    })
    if (!existUser) throw new Error('user does not exist')

    const duplicateUser = await this.userRepository.findOne({
      where: { guest_code: updateUserDto.guest_code }
    })
    if (duplicateUser) throw new Error('user code already using')

    Object.assign(existUser, updateUserDto);
    return await this.userRepository.save(updateUserDto);
  }

  async remove(code: number) {
    return await this.userRepository.delete(code)
  }

  async reset() {
    const { data: initialData } = await axios.get('http://secuprime.com/recruit/202308_testdata.php')
    if (initialData) throw new Error('api server error')
    // const { cust: users, cust_detail: usersDetail }: { cust: User[], cust_detail: UserDetail[] } = initialData.data[0]

    // await this.userRepository.clear();
    // await this.userDetailRepository.clear();

    // const usersToInsert = users.map((user, usersIndex) => {
    //   const userDetail = usersDetail[usersIndex]
    //   const instanceArray = [];
    //   instanceArray.push(this.userRepository.create(user))
    //   instanceArray.push(this.userDetailRepository.create(userDetail))
    //   return instanceArray
    // });

    // const usersToInsert = users.map(user => this.userRepository.create(user));
    // await this.userRepository.save(usersToInsert);

    // const usersDetailToInsert = users.map(userDetail => this.userDetailRepository.create(userDetail));
    // await this.userRepository.save(usersDetailToInsert);

    return `This action reset the db`
  }
}
