import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {
	extendedUserRepository,
	ExtendedUserRepository
} from './user.repository';

@Injectable()
export class UserService {
	private userRepository: ExtendedUserRepository;

	constructor(
		@InjectRepository(User)
		private readonly repository: Repository<User>
	) {
		this.userRepository = this.repository.extend(extendedUserRepository);
	}

	async findOne(): Promise<string> {
		const user = await this.userRepository.findByUsername('john');
		console.log(user);
		return 'This action returns a user';
	}
}
