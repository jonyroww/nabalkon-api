import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity({ name: "category" })
export class Category {
  @ApiProperty()
  @PrimaryColumn({
    type: "int",
    generated: true,
    readonly: true
  })
  id: number;

  @ApiProperty({ example: "Название" })
  @Column({
    type: "text"
  })
  title: string;

  @ApiProperty()
  @Column({
    type: "int"
  })
  parent_category_id: number;
}
