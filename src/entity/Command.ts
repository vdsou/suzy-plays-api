import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Command {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  playlist_title: string;

  @Column()
  command_name: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.id)
  user_id: String;
}
