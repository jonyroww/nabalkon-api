import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Ads } from '../../ads/entities/Ads.entity';

@Entity('ad_specs')
export class AdSpec {
  @ApiProperty()
  @PrimaryColumn({
    type: 'int',
    generated: true,
    readonly: true,
  })
  id: number;

  @ApiProperty({ type: 'string' })
  @Column({ type: 'varchar' })
  title: string;

  @ApiProperty({ type: 'int' })
  @Column({ type: 'int' })
  ad_id: number;

  @ApiProperty({ type: 'string' })
  @Column({ type: 'varchar' })
  value: string;

  @ApiProperty()
  @ManyToOne(
    () => Ads,
    (ad: Ads) => ad.specs,
    { eager: true },
  )
  @JoinColumn({ name: 'ad_id' })
  ad: Ads;
}
