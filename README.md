# NestJS TypeORM Extended Repository Example

This repository demonstrates how to properly extend a TypeORM repository in a NestJS application. It shows how to create custom repository methods, inject and use them in services, and share them across different modules.

## How to Run This Repository

1. Clone the repository:
   ```bash
   git clone https://github.com/aymather/extending-typeorm-repository
   cd extending-typeorm-repository
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up your database connection in `<PROJECT ROOT>/src/app.module.ts` or in a `.env` file.

4. Run the application:
   ```bash
   yarn start:dev
   ```

## How to Properly Extend a Repository

1. Create a file for your extended repository (e.g., `user.repository.ts`):

```typescript
import { Repository } from 'typeorm';
import { User } from './user.entity';

export interface ExtendedUserRepository extends Repository<User> {
  findByUsername(username: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}

export const extendedUserRepository = {
  findByUsername(this: Repository<User>, username: string) {
    return this.findOne({ where: { username } });
  },
  findByEmail(this: Repository<User>, email: string) {
    return this.findOne({ where: { email } });
  }
};
```

## How to Inject and Extend the Repository in a Service

In your service file (e.g., `user.service.ts`):

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { extendedUserRepository, ExtendedUserRepository } from './user.repository';

@Injectable()
export class UserService {
  private userRepository: ExtendedUserRepository;

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {
    this.userRepository = this.repository.extend(extendedUserRepository);
  }

  // Use this.userRepository to access custom methods
}
```

## How to Use the Extended Repository in a Different Module

1. Make sure to import the regular entity in the module where you want to use it just like you would with a regular repository:

```typescript
// artist.module.ts
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
```

2. In the service of the different module, inject and extend the repository the same way you did in the original service:

```typescript
// artist.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { ExtendedUserRepository, extendedUserRepository } from 'src/user/user.repository';
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

  // Use this.userRepository to access custom methods
}
```

## Key Points

- The extended repository is defined using an interface and an object with method implementations.
- The `extend` method is used to add custom methods to the repository instance.
- Custom repository methods are available in any service where you inject and extend the repository.
- To use the extended repository in a different module, import the entity in that module and inject/extend the repository in the service.

This approach allows you to create reusable, type-safe repository extensions that can be shared across your NestJS application.