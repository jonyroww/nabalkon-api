import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/User.repository';
import { User } from './entities/User.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserRepository,User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
