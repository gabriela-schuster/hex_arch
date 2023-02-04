import { HttpService } from '@nestjs/axios'
import { Injectable, Inject } from '@nestjs/common'
import { lastValueFrom } from 'rxjs'
import { CreateListDto } from './dto/create-list.dto'
import { UpdateListDto } from './dto/update-list.dto'
import { List } from './entities/list.entity'
import { ListGatewayInterface } from './gateways/list-gateway-interface'

@Injectable()
export class ListsService {
	constructor(
		@Inject('ListGatewayInterface')
		private listGateway: ListGatewayInterface,
		private httpService: HttpService
	) {}

	async create(createListDto: CreateListDto) {
		const list = new List(createListDto.name)
		await this.listGateway.create(list)
		await lastValueFrom(this.httpService.post('lists', {name: list.name}))
		return list
	}

	findAll() {
		return this.listGateway.findAll()
	}

	async findOne(id: number) {
		const list = await this.listGateway.findById(id)
		if (!list) {
			throw new Error('List not found')
		}

		return list
	}

	update(id: number, updateListDto: UpdateListDto) {
		return `This action updates a #${id} list`
	}

	remove(id: number) {
		return `This action removes a #${id} list`
	}
}
