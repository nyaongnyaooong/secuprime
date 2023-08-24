import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  guest_code: number;

  @Column()
  guest_name: string;
  
  @Column()
  guest_birth: string;
}
