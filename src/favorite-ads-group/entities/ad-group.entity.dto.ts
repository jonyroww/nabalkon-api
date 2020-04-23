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

@Entity("favorite_sellers")
export class FavoriteSeller {
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
  ad_id: number;

  @ApiProperty({ type: "string" })
  @Column({ type: "varchar" })
  title: number;
}
