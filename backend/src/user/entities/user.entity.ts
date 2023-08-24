import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserDetail } from "./userdetail.entity";

@Entity()
export class User {
  @PrimaryColumn()
  guest_code: number;

  @Column()
  guest_name: string;
  
  @Column()
  guest_birth: string;

  // @OneToOne(() => UserDetail, userDetail => userDetail.user)
  // @JoinColumn()
  // userDetail: UserDetail;
}
