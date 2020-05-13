import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  UseGuards,
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
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller()
export class FavoriteAdsGroupController {
  constructor(private favoriteAdsGroupService: FavoriteAdsGroupService) {}

  @ApiTags('Favorite ads groups')
  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'), UserWriteAccessGuard)
  @ApiCreatedResponse()
  @ApiBearerAuth()
  @Post('users/:userId/favorites/ads/groups')
  createFavoriteAdGroup(
    @Param() params: UserIdDto,
    @Body() body: CreateFavoriteAdGroupDto,
  ) {
    return this.favoriteAdsGroupService.createFavoriteAdGroup(params, body);
  }

  @ApiTags('Favorite ads groups')
  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'), UserWriteAccessGuard)
  @ApiOkResponse()
  @ApiBearerAuth()
  @Get('users/:userId/favorites/ads/groups')
  getFavoriteAdGroup(@Param() params: UserIdDto) {
    return this.favoriteAdsGroupService.getFavoriteAdGroups(params);
  }

  @ApiTags('Favorite ads groups')
  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'), UserWriteAccessGuard)
  @ApiOkResponse()
  @ApiBearerAuth()
  @Get('users/:userId/favorites/ads/groups/:groupId')
  getOneFavoriteAdGroup(@Param() params: UpdateGroupDto) {
    return this.favoriteAdsGroupService.getOneFavoriteAdGroup(params);
  }

  @ApiTags('Favorite ads groups')
  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'), UserWriteAccessGuard)
  @ApiOkResponse()
  @ApiBearerAuth()
  @Delete('users/:userId/favorites/ads/groups/:groupId')
  DeleteFavoriteAdGroup(@Param() params: UpdateGroupDto) {
    return this.favoriteAdsGroupService.deleteFavoriteAdGroup(params);
  }
}
