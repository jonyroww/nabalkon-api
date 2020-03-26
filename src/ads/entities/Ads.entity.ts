import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity({ name: "ads" })
export class Ads {
  @ApiProperty()
  @PrimaryColumn({
    type: "int",
    generated: true,
    readonly: true
  })
  id: number;

  @ApiProperty({
    type: "string",
    example: "2019-11-22T16:03:05Z",
    nullable: false
  })
  @Column({
    nullable: false,
    type: "timestamp with time zone"
  })
  created_at: Date;

  @ApiPropertyOptional({ type: "string", example: "2019-11-22T16:03:05Z" })
  @Column({ type: "timestamp with time zone", nullable: false })
  updated_at: Date;

  @ApiPropertyOptional({ type: "string", example: "2019-11-22T16:03:05Z" })
  @Column({ type: "timestamp with time zone" })
  deleted_at: Date;

  @ApiPropertyOptional({ type: "string", example: "2019-11-22T16:03:05Z" })
  @Column({ type: "timestamp with time zone" })
  active_until: Date;
}
