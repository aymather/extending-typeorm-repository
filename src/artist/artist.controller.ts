import { Controller, Get } from '@nestjs/common';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
	constructor(private readonly artistService: ArtistService) {}

	@Get()
	async findOne(): Promise<string> {
		return this.artistService.findOne();
	}
}
