import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  UseGuards,
  Query,
  Delete,
} from '@nestjs/common';
import { UserIdDto } from '../common/dto/user-id.dto';
import { FavoriteAdsGroupService } from './favorite-ads-group.service';
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserWriteAccessGuard } from '../common/guards/read-access.guard';
import { CreateFavoriteAdGroupDto } from './dto/create-ad-group.dto';

@Controller()
export class FavoriteAdsGroupController {
  constructor(private favoriteAdsGroupService: FavoriteAdsGroupService) {}

  @ApiTags('Favorite ads groups')
  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'), UserWriteAccessGuard)
  @ApiCreatedResponse()
  @ApiBearerAuth()
  @Post('users/:userId/favorites/ads/groups')
  createFavoriteAd(
    @Param() params: UserIdDto,
    @Body() body: CreateFavoriteAdGroupDto,
  ) {
    return this.favoriteAdsGroupService.createFavoriteAdGroup(params, body);
  }
}
