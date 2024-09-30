import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import {
	ExtendedUserRepository,
	extendedUserRepository
} from 'src/user/user.repository';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
	private userRepository: ExtendedUserRepository;

	constructor(
		@InjectRepository(User)
		private readonly repository: Repository<User>
	) {
		this.userRepository = repository.extend(extendedUserRepository);
	}

	async findOne(): Promise<string> {
		console.log('From the artist service...');
		const user = await this.userRepository.findByUsername('john');
		console.log(user);
		return 'This action queries a user';
	}
}
