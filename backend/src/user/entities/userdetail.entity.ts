import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserDetail {
  @PrimaryColumn()
  guest_code: number;

  @Column()
  guest_hp: string;
  
  @Column()
  guest_addr: string;

  @Column()
  guest_mail: string;

  // @OneToOne(() => User, user => user.userDetail)
  // user: User;
}
