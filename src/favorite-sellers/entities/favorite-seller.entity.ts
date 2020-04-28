import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('favorite_sellers')
export class FavoriteSeller {
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

  @ApiProperty({ type: 'int' })
  @Column({ type: 'int' })
  seller_id: number;

  @ApiProperty({ type: 'int' })
  @Column({ type: 'int' })
  user_id: number;
}
