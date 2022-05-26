import { Command } from "./Command";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => Command, (command) => command.id)
  command_id: Command;
}
