import {
  Controller,
  UseGuards,
  Post,
  Body,
  Param,
  Delete,
  Get,
  Query,
} from "@nestjs/common";
import { UserIdDto } from "./dto/user-id.dto";
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { BasketService } from "./basket.service";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../users/entities/User.entity";
import { GetUser } from "../common/decorators/get-user.decorator";
import { AdIdDto } from "./dto/ad-id.dto";
import { UserWriteAccessGuard } from "../common/guards/read-access.guard";
import { DeleteUsersBasketDto } from "./dto/delete-ad-params.dto";
import { SortQueryDto } from "./dto/query.dto";

@Controller()
export class BasketController {
  constructor(private basketService: BasketService) {}

  @ApiTags("Basket")
  @ApiCreatedResponse()
  @UseGuards(AuthGuard("jwt"), UserWriteAccessGuard)
  @ApiBearerAuth()
  @Post("/users/:userId/basket/ads")
  createUsersBasketAd(@Param() params: UserIdDto, @Body() body: AdIdDto) {
    return this.basketService.createUsersBasketAd(params, body);
  }

  @ApiTags("Basket")
  @ApiCreatedResponse()
  @UseGuards(AuthGuard("jwt"), UserWriteAccessGuard)
  @ApiBearerAuth()
  @Get("/users/:userId/basket/ads")
  getAdsBasket(@Param() params: UserIdDto, @Query() query: SortQueryDto) {
    return this.basketService.getUsersBasketAd(params, query);
  }

  @ApiTags("Basket")
  @ApiCreatedResponse()
  @UseGuards(AuthGuard("jwt"), UserWriteAccessGuard)
  @ApiBearerAuth()
  @Delete("/users/:userId/basket/ads/:adId")
  deleteUsersBasketAd(@Param() params: DeleteUsersBasketDto) {
    return this.basketService.deleteUsersBasketAd(params);
  }
}
