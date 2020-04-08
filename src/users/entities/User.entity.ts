import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  Index,
  OneToOne,
} from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Ads } from "../../ads/entities/Ads.entity";
import { PhoneVerification } from "../../phone-verification/entities/Phone-verification.entity";

@Entity({ name: "users" })
export class User {
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
  @Index()
  @Column({
    nullable: false,
    type: "timestamp with time zone",
  })
  created_at: Date;

  @ApiPropertyOptional({ type: "string", example: "2019-11-22T16:03:05Z" })
  @Column({ type: "timestamp with time zone" })
  updated_at: Date;

  @ApiPropertyOptional({ type: "string", example: "2019-11-22T16:03:05Z" })
  @Column({ type: "timestamp with time zone" })
  deleted_at: Date;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar" })
  avatar_url: string;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar" })
  full_name: string;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar" })
  city: string;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar" })
  district: string;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar", unique: true })
  email: string;

  @ApiPropertyOptional({ type: "boolean" })
  @Column({ type: "boolean" })
  email_confirmed: boolean;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar", unique: true })
  phone: string;

  @ApiPropertyOptional({ type: "boolean" })
  @Column({ type: "boolean" })
  phone_confirmed: boolean;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar", unique: true })
  contract_id: string;

  @ApiPropertyOptional({ type: "boolean" })
  @Column({ type: "boolean" })
  approved: boolean;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar", unique: true })
  password: string;

  @OneToOne(
    () => PhoneVerification,
    (registration: PhoneVerification) => registration.user
  )
  registration: PhoneVerification;

  @ApiProperty()
  @OneToMany(
    () => Ads,
    (ads: Ads) => ads.user_id
  )
  ad: Ads[];
}
