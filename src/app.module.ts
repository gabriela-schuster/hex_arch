import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { List } from './lists/entities/list.entity'
import { ListsModule } from './lists/lists.module'

@Module({
	imports: [
		ListsModule,
		SequelizeModule.forRoot({dialect: 'sqlite', host: ':memory:', autoLoadModels: true, models: [List]})
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
