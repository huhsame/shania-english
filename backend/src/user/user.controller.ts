import { Controller, Put, Get, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.id;
    return this.userService.getUserProfile(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('personalization')
  async updatePersonalizationInfo(
    @Request() req,
    @Body() updateUserInfoDto: UpdateUserInfoDto,
  ) {
    const userId = req.user.id;
    return this.userService.updatePersonalizationInfo(userId, updateUserInfoDto);
  }
} 