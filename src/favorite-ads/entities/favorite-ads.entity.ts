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
import { FavoriteAdGroup } from "../../favorite-ads-group/entities/ad-group.entity";

@Entity("favorite_ads")
export class FavoriteAd {
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

  @ApiProperty({ type: "int" })
  @Column({ type: "int" })
  user_id: number;

  @ApiProperty({ type: "int" })
  @Column({ type: "int" })
  ad_id: number;

  @ApiProperty({ type: "int" }) 
  @Column({ type: "int" })
  group_id: number;

  @ApiProperty()
  @ManyToOne(
    () => FavoriteAdGroup,
    (group: FavoriteAdGroup) => group.favorite_ads,
    {eager:true}
  )
  @JoinColumn({ name: "group_id" })
  group: FavoriteAdGroup;
}
