import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Ads } from '../entities/Ads.entity';

@Entity({ name: 'ads_favorites_metadata' })
export class AdsFavoritesMetadata {
  @ApiPropertyOptional()
  @PrimaryColumn({ type: 'int' })
  ad_id: number;

  @ApiPropertyOptional()
  @Column({ type: 'int' })
  count_ad_favorites: number;

  @ApiPropertyOptional({ type: () => Ads })
  @OneToOne(
    () => Ads,
    (ads: Ads) => ads.ads_favorites_methadata,
  )
  @JoinColumn({ name: 'ad_id' })
  ad: Ads;
}
