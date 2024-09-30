import { Repository } from 'typeorm';
import { User } from './user.entity';

export interface ExtendedUserRepository extends Repository<User> {
	findByUsername(username: string): Promise<User | undefined>;
	findByEmail(email: string): Promise<User | undefined>;
}

export const extendedUserRepository = {
	findByUsername(this: Repository<User>, username: string) {
		console.log(
			'Hello from inside the extended user repository findByUsername method'
		);
		return this.findOne({ where: { username } });
	},
	findByEmail(this: Repository<User>, email: string) {
		console.log(
			'Hello from inside the extended user repository findByUsername method'
		);
		return this.findOne({ where: { email } });
	}
};
