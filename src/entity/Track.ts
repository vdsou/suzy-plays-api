import { Command } from "./Command";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  command_id: string;

  @ManyToOne(() => Command, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: "command_id" })
  command: Command;
}
