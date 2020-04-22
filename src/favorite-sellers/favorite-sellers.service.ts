import { Injectable } from "@nestjs/common";
import { FavoriteSellerRepository } from "./repositories/favorite-seller.repository";
import { UserIdDto } from "src/common/dto/user-id.dto";
import { SellerIdDto } from "./dto/create-favorite-seller-body.dto";
import { makeError } from "../common/errors/index";
import { UserRepository } from "../users/repositories/User.repository";
import { SortQueryDto } from "./dto/query.dto";
import { Order } from "../constants/Order.enum";
import { DeleteFavoriteSellerDto } from "./dto/delete-params.dto";
import _ from "lodash";

@Injectable()
export class FavoriteSellersService {
  constructor(
    private favoriteSellerRepository: FavoriteSellerRepository,
    private userRepository: UserRepository
  ) {}

  async createFavoriteSeller(params: UserIdDto, body: SellerIdDto) {
    const isSellerAdded = await this.favoriteSellerRepository.findOne({
      where: { user_id: params.userId, seller_id: body.sellerId },
    });

    if (isSellerAdded) {
      throw makeError("SELLER_ALREADY_ADDED");
    }

    const user = await this.userRepository.findOne({ id: params.userId });
    if (!user || user.deleted_at) {
      throw makeError("USER_NOT_FOUND");
    } else {
      const favoriteSeller = this.favoriteSellerRepository.create();
      favoriteSeller.user_id = params.userId;
      favoriteSeller.seller_id = body.sellerId;
      await this.favoriteSellerRepository.save(favoriteSeller);
      return favoriteSeller;
    }
  }

  async getFavoriteSellers(params: UserIdDto, query: SortQueryDto) {
    const favoriteSellers = await this.favoriteSellerRepository.find({
      where: { user_id: params.userId },
    });

    const sellerIds = favoriteSellers.map(
      (favoriteSeller) => favoriteSeller.seller_id
    );
    if (_.isEmpty(sellerIds)) {
      return { total: 0, data: [] };
    }
    const qb = this.userRepository.createQueryBuilder("users");

    qb.where("users.id IN (:...sellerIds)", {
      sellerIds: sellerIds,
    });
    qb.andWhere("users.deleted_at is null");

    if (query.sort && query.order) {
      qb.orderBy(query.sort, query.order || Order.ASC);
    }
    const [data, total] = await qb
      .limit(params.limit)
      .offset(params.offset)
      .getManyAndCount();
    return { total: total, data: data };
  }

  async deleteFavoriteSellers(params: DeleteFavoriteSellerDto) {
    const favoriteSeller = await this.favoriteSellerRepository.findOne({
      where: { user_id: params.userId, seller_id: params.sellerId },
    });

    if (favoriteSeller) {
      await this.favoriteSellerRepository.delete({ id: favoriteSeller.id });
      return;
    } else {
      throw makeError("RECORD_NOT_FOUND");
    }
  }
}
