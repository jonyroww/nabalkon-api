import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Ads } from '../../ads/entities/Ads.entity';
import { User } from '../../users/entities/User.entity';

@Entity({ name: 'ad_views' })
export class AdView {
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

  @ApiProperty()
  @Column({
    type: 'int',
    nullable: false,
  })
  ad_id: number;

  @ApiProperty()
  @Column({
    type: 'int',
    nullable: false,
  })
  user_id: number;

  @ApiProperty()
  @ManyToOne(
    () => Ads,
    (ad: Ads) => ad.views,
  )
  @JoinColumn({ name: 'ad_id' })
  ad: Ads;

  @ApiProperty()
  @ManyToOne(
    () => User,
    (user: User) => user.views,
  )
  @JoinColumn({ name: 'user_id' })
  user: User;
}
