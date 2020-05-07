import { Injectable } from '@nestjs/common';
import { FavoriteAdRepository } from './repositories/favorite-ads.repository';
import { UserIdDto } from '../common/dto/user-id.dto';
import { CreateFavoriteAdDto } from './dto/create-favorite-ad-body.dto';
import { UserRepository } from '../users/repositories/User.repository';
import {makeError} from '../common/errors/index'

@Injectable()
export class FavoriteAdsService {
    constructor(private favoriteAdRepository:FavoriteAdRepository, private userRepository: UserRepository){}

 async createFavoriteAd(params:UserIdDto, body: CreateFavoriteAdDto){
        const user = await this.userRepository.findOne({id:params.userId})
        if (!user && user.deleted_at){
            throw makeError("USER_NOT_FOUND")
        }
        const favoriteAd = this.favoriteAdRepository.create()
        favoriteAd.ad_id = body.adId;
        favoriteAd.group_id = body.groupId;
        favoriteAd.user_id = params.userId;
        await this.favoriteAdRepository.save(favoriteAd);
        return favoriteAd;
    }
}
