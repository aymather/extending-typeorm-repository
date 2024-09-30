import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: '<YOUR HOST>',
			port: 5432,
			username: '<YOUR USERNAME>',
			password: '<YOUR PASSWORD>',
			database: '<YOUR DATABASE>',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true
		}),
		UserModule,
		ArtistModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
