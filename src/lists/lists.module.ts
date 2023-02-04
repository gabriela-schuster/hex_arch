import { Module } from '@nestjs/common'
import { ListsService } from './lists.service'
import { ListsController } from './lists.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { ListModel } from './entities/list.model'
import { HttpModule } from '@nestjs/axios'
import { ListGatewaySequelize } from './gateways/list-gateway-sequelize'

@Module({
	imports: [
		SequelizeModule.forFeature([ListModel]),
		HttpModule.register({baseURL: 'http://localhost:3001'}),
	],
	controllers: [ListsController],
	providers: [
		ListsService,
		ListGatewaySequelize,
		{
			provide: 'ListGatewayInterface',
			useExisting: ListGatewaySequelize
		}
	]
})
export class ListsModule {}
