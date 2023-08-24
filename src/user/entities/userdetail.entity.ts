import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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
}
