import { Command } from "./Command";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Track {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  track_title: string;

  @Column()
  image_url: string;

  @Column()
  duration: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Command, (command) => command.id)
  command_id: string;
}
