import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AdsState } from '../../constants/AdsState.enum';
import { AdsTransferMode } from '../../constants/AdsTransferMode.enum';
import { AdsStatus } from '../../constants/AdsStatus.enum';
import { User } from '../../users/entities/User.entity';
import { AdView } from '../../ad-views/entities/AdView.entity';
import { UserBasketAds } from '../../basket/entities/Basket.entity';
import { FavoriteAdGroup } from '../../favorite-ads-group/entities/ad-group.entity';

@Entity({ name: 'ads' })
export class Ads {
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

  @ApiPropertyOptional({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @Column({ type: 'timestamp with time zone', nullable: false })
  updated_at: Date;

  @ApiPropertyOptional({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @Column({ type: 'timestamp with time zone' })
  deleted_at: Date;

  @ApiPropertyOptional({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @Column({ type: 'timestamp with time zone' })
  active_until: Date;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  city: string;

  @ApiPropertyOptional()
  @Column('enum', {
    enum: AdsState,
  })
  state: AdsState;

  @ApiPropertyOptional()
  @Column({ type: 'text' })
  state_description: string;

  @ApiPropertyOptional()
  @Column({ type: 'float' })
  weight: number;

  @ApiPropertyOptional()
  @Column({
    type: 'text',
  })
  title: string;

  @ApiPropertyOptional()
  @Column({ type: 'text' })
  description: string;

  @ApiPropertyOptional()
  @Column({ type: 'decimal', scale: 2 })
  price: number;

  @ApiPropertyOptional()
  @Column('enum', {
    enum: AdsTransferMode,
  })
  transfer_mode: AdsTransferMode;

  @ApiPropertyOptional()
  @Column({
    type: 'varchar',
  })
  deal_address: string;

  @ApiPropertyOptional()
  @Column({
    type: 'json',
  })
  deal_coordinates: JSON;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  contact_email: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  contact_phone: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  contact_call_time_start: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  contact_call_time_end: string;

  @ApiPropertyOptional({ type: 'boolean' })
  @Column({ type: 'boolean' })
  contact_can_call_rdc: boolean;

  @ApiPropertyOptional({ type: 'boolean' })
  @Column({ type: 'boolean' })
  contact_no_matter: boolean;

  @ApiPropertyOptional()
  @Column('enum', {
    enum: AdsStatus,
  })
  status: AdsStatus;

  @ApiPropertyOptional({ type: 'int' })
  @Column({ type: 'int' })
  user_id: number;

  @ApiProperty({ type: 'int' })
  @Column({ type: 'int' })
  category_id: number;

  @ApiProperty()
  @ManyToOne(
    () => User,
    (user: User) => user.ad,
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty()
  @OneToMany(
    () => AdView,
    (adView: AdView) => adView.ad,
  )
  views: AdView[];

  @ApiProperty()
  @OneToMany(
    () => UserBasketAds,
    (userBasketAds: UserBasketAds) => userBasketAds.ad,
  )
  user_basket_ads: UserBasketAds[];

  @ApiPropertyOptional({ type: () => User })
  @ManyToMany(
    () => User,
    (user: User) => user.favorite_ads
  )
  @JoinTable({
    name: "favorite_ads",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "ad_id", referencedColumnName: "id" },
  })
  users_added_to_favorite: User[];
}
