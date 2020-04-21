import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { User } from "../../users/entities/User.entity";
import { Ads } from "../../ads/entities/Ads.entity";

@Entity("user_basket_ads")
export class UserBasketAds {
  @ApiProperty()
  @PrimaryColumn({
    type: "int",
    generated: true,
    readonly: true,
  })
  id: number;

  @ApiProperty({
    type: "string",
    example: "2019-11-22T16:03:05Z",
    nullable: false,
  })
  @Column({
    nullable: false,
    type: "timestamp with time zone",
  })
  created_at: Date;

  @ApiPropertyOptional({ type: "int" })
  @Column({ type: "int" })
  user_id: number;

  @ApiPropertyOptional({ type: "int" })
  @Column({ type: "int" })
  ad_id: number;

  @ApiProperty()
  @ManyToOne(
    () => User,
    (user: User) => user.user_basket_ads
  )
  @JoinColumn({ name: "user_id" })
  user: User;

  @ApiProperty()
  @ManyToOne(
    () => Ads,
    (ad: Ads) => ad.user_basket_ads
  )
  @JoinColumn({ name: "ad_id" })
  ad: Ads;
}
