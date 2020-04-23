import {
  Controller,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Post,
  Param,
  Body,
  Get,
  Query,
  Delete,
} from "@nestjs/common";
import { FavoriteSellersService } from "./favorite-sellers.service";
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { UserIdDto } from "../common/dto/user-id.dto";
import { SellerIdDto } from "./dto/create-favorite-seller-body.dto";
import { SortQueryDto } from "./dto/query.dto";
import { DeleteFavoriteSellerDto } from "./dto/delete-params.dto";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller()
export class FavoriteSellersController {
  constructor(private favoriteSellersService: FavoriteSellersService) {}

  @ApiTags("Favorite sellers")
  @ApiCreatedResponse()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @Post("/users/:userId/favorites/sellers")
  createFavoriteSeller(@Param() params: UserIdDto, @Body() body: SellerIdDto) {
    return this.favoriteSellersService.createFavoriteSeller(params, body);
  }

  @ApiTags("Favorite sellers")
  @ApiCreatedResponse()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @Get("/users/:userId/favorites/sellers")
  getFavoriteSellers(@Param() params: UserIdDto, @Query() query: SortQueryDto) {
    return this.favoriteSellersService.getFavoriteSellers(params, query);
  }

  @ApiTags("Favorite sellers")
  @ApiOkResponse()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @Delete("/users/:userId/favorites/sellers/:sellerId")
  deleteFavoriteSellers(@Param() params: DeleteFavoriteSellerDto) {
    return this.favoriteSellersService.deleteFavoriteSellers(params);
  }
}
