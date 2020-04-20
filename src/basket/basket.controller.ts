import { Controller, UseGuards, Post, Body, Param } from "@nestjs/common";
import { CreateUsersBasketDto } from "./dto/create-users-basket-ad.dto";
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

@Controller()
export class BasketController {
  constructor(private basketService: BasketService) {}

  @ApiTags("Basket")
  @ApiCreatedResponse()
  @UseGuards(AuthGuard("jwt"), UserWriteAccessGuard)
  @ApiBearerAuth()
  @Post("/users/:userId/basket/ads")
  createAd(@Param() params: CreateUsersBasketDto, @Body() body: AdIdDto) {
    return this.basketService.createUsersBasketAd(params, body);
  }
}
