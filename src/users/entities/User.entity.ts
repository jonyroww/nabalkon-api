import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  Index,
  OneToOne,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Ads } from '../../ads/entities/Ads.entity';
import { PhoneVerification } from '../../phone-verification/entities/Phone-verification.entity';
import { AdView } from '../../ad-views/entities/AdView.entity';
import { RoleName } from '../../constants/RoleName.enum';
import { UserBasketAds } from '../../basket/entities/Basket.entity';
import { FavoriteAdGroup } from '../../favorite-ads-group/entities/ad-group.entity';

@Entity({ name: 'users' })
export class User {
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
  @Index()
  @Column({
    nullable: false,
    type: 'timestamp with time zone',
  })
  created_at: Date;

  @ApiPropertyOptional({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @Column({ type: 'timestamp with time zone' })
  updated_at: Date;

  @ApiPropertyOptional({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @Column({ type: 'timestamp with time zone' })
  deleted_at: Date;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  avatar_url: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  full_name: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  city: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  district: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar', unique: true })
  email: string;

  @ApiPropertyOptional({ enum: RoleName })
  @Column('enum', { enum: RoleName, nullable: false })
  role: RoleName;

  @ApiPropertyOptional({ type: 'boolean' })
  @Column({ type: 'boolean' })
  email_confirmed: boolean;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar', unique: true })
  phone: string;

  @ApiPropertyOptional({ type: 'boolean' })
  @Column({ type: 'boolean' })
  phone_confirmed: boolean;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar', unique: true })
  contract_id: string;

  @ApiPropertyOptional({ type: 'boolean' })
  @Column({ type: 'boolean' })
  approved: boolean;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar', unique: true })
  password: string;

  @OneToOne(
    () => PhoneVerification,
    (registration: PhoneVerification) => registration.user,
  )
  registration: PhoneVerification;

  @ApiProperty()
  @OneToMany(
    () => Ads,
    (ads: Ads) => ads.user,
  )
  ad: Ads[];

  @ApiProperty()
  @OneToMany(
    () => AdView,
    (adView: AdView) => adView.user,
  )
  views: AdView[];

  @ApiPropertyOptional({ type: () => Ads })
  @ManyToMany(() => Ads)
  @JoinTable({
    name: 'user_basket_ads',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'ad_id', referencedColumnName: 'id' },
  })
  ads_in_basket: Ads[];

  @ApiProperty()
  @OneToMany(
    () => UserBasketAds,

    (userBasketAds: UserBasketAds) => userBasketAds.user,
  )
  user_basket_ads: UserBasketAds[];

  @ApiPropertyOptional({ type: () => User })
  @ManyToMany(() => User)
  @JoinTable({
    name: 'favorite_sellers',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'seller_id', referencedColumnName: 'id' },
  })
  favorite_sellers: User[];

  @ApiProperty()
  @OneToMany(
    () => FavoriteAdGroup,
    (favoriteAdGroup: FavoriteAdGroup) => favoriteAdGroup.user,
  )
  favorite_groups: FavoriteAdGroup[];

  @ApiPropertyOptional({ type: () => Ads })
  @ManyToMany(
    () => Ads,
    (ad: Ads) => ad.users_added_to_favorite,
    { eager: true },
  )
  @JoinTable({
    name: 'favorite_ads',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'ad_id', referencedColumnName: 'id' },
  })
  favorite_ads: Ads[];
}
