import {
  ViewEntity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Ads } from '../entities/Ads.entity';

@ViewEntity({
  name: 'ads_favorites_metadata',
  expression: `
    SELECT ads.id AS ad_id, count(favorite_ads.ad_id) AS count_favorite_ads
    FROM ads LEFT JOIN favorite_ads ON ads.id = favorite_ads.ad_id
    GROUP BY ads.id`,
})
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
    (ads: Ads) => ads.ads_favorites_metadata,
  )
  @JoinColumn({ name: 'ad_id' })
  ad: Ads;
}
