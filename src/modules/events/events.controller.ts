import { Body, Controller, Delete, Get, Post, UsePipes, Param, Put, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiOkResponsePaginated, getPaginationObject } from 'back-shared-utils';
import {
  badRequestErrorSwagger,
  createEntityResponseOnlyIdSwagger,
  internalServerErrorTypeSwagger,
  okEntityResponseOnlyIdSwagger,
  unprocessableEntityErrorSwagger,
} from 'back-shared-utils/lib/const';
import { UserId } from 'back-shared-utils/lib/decorators';
import { BackendValidationPipe } from 'back-shared-utils/lib/pipes';

import { AddEventDto, GetPetsWithFilterAndPaginationDto } from './dto';
import { EventsService } from './events.service';
import { ResponsePet, ResponsePetsBirthday } from './swagger';

@Controller('events')
@ApiTags('Events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('/byTypes')
  @ApiResponse(internalServerErrorTypeSwagger)
  @ApiOperation({ summary: 'Get events of a certain type', description: 'user id in token' })
  async getEventsByTypes(@UserId() userId: string | null): Promise<ResponsePetsBirthday[]> {
    const pets = await this.eventsService.getEventsByTypes(userId);

    return this.eventsService.mappedEventsByTypes(pets);
  }

  @Get('/:id')
  @ApiResponse(internalServerErrorTypeSwagger)
  @ApiResponse(badRequestErrorSwagger)
  @ApiOperation({ summary: 'Get information about event', description: 'user id in token' })
  async getEvent(
    @UserId() userId: string | null,
    @Param('id', new ParseUUIDPipe()) eventId: string,
  ): Promise<ResponsePet> {
    const pet = await this.eventsService.getEvent(userId, eventId);

    return this.eventsService.mappedEvent(userId, pet);
  }

  @Get()
  @ApiResponse(unprocessableEntityErrorSwagger)
  @ApiResponse(internalServerErrorTypeSwagger)
  @ApiOkResponsePaginated(ResponsePet)
  @ApiOperation({
    summary: 'Get list events with filtering and pagination',
  })
  @UsePipes(new BackendValidationPipe())
  async getEventsWithFilterAndPagination(
    @UserId() userId: string | null,
    @Query() filter: GetPetsWithFilterAndPaginationDto,
  ) {
    const [list, total] = await this.eventsService.getEventsWithFilterAndPagination(filter);

    return { list: this.eventsService.mappedEvents(userId, list), pagination: getPaginationObject(filter, total) };
  }

  @Post()
  @ApiResponse(unprocessableEntityErrorSwagger)
  @ApiResponse(internalServerErrorTypeSwagger)
  @ApiOperation({ summary: 'Adding new event' })
  @ApiResponse(createEntityResponseOnlyIdSwagger)
  @UsePipes(new BackendValidationPipe())
  async addEvent(@Body() addEventDto: AddEventDto) {
    const event = await this.eventsService.addEvent(addEventDto);

    return { id: event.id };
  }

  @Put('/:id')
  @ApiResponse(unprocessableEntityErrorSwagger)
  @ApiResponse(internalServerErrorTypeSwagger)
  @ApiResponse(okEntityResponseOnlyIdSwagger)
  @ApiResponse(badRequestErrorSwagger)
  @ApiOperation({ summary: 'Update event', description: 'user id in token' })
  @UsePipes(new BackendValidationPipe())
  async updateEvent(
    @Body() updatePetDto: AddPetDto,
    @UserId() userId: string | null,
    @Param('id', new ParseUUIDPipe()) eventId: string,
  ) {
    await this.eventsService.updateEvent(userId, eventId, updatePetDto);

    return { id: eventId };
  }

  @Delete('/:id')
  @ApiResponse(internalServerErrorTypeSwagger)
  @ApiResponse(okEntityResponseOnlyIdSwagger)
  @ApiResponse(badRequestErrorSwagger)
  @ApiOperation({ summary: 'Remove event', description: 'user id in token' })
  async removeEvent(@Param('id', new ParseUUIDPipe()) eventId: string) {
    await this.eventsService.removeEvent(eventId);

    return { id: eventId };
  }
}
