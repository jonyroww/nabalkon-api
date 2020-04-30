import { Entity, PrimaryColumn, Column,ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {User} from "../../users/entities/User.entity"


@Entity("favorite_ads_groups")
export class FavoriteAdGroup {
  @ApiProperty()
  @PrimaryColumn({
    type: 'int',
    generated: true,
    readonly: true,
  })
  id: number;

  @ApiProperty({
    type: 'string',
    example: '2019-11-22T16:03:05Z',
    nullable: false,
  })
  @Column({
    nullable: false,
    type: 'timestamp with time zone',
  })
  created_at: Date;


  @ApiProperty({ type: "int" })
  @Column({ type: "int" })
  user_id: number;


  @ApiProperty({ type: 'string' })
  @Column({ type: 'varchar' })
  title: number;

  @ApiProperty()
  @ManyToOne(
    () => User,
    (user: User) => user.favorite_groups
  )
  @JoinColumn({ name: "user_id" })
  user: User;
}
