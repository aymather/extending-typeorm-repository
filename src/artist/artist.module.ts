import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [ArtistService],
	controllers: [ArtistController]
})
export class ArtistModule {}
