import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  UsePipes,
  Param,
  Put,
  Patch,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
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
import { AuthGuard } from 'back-shared-utils/lib/guards';
import { BackendValidationPipe } from 'back-shared-utils/lib/pipes';

import { AddPetDto, GetPetsWithFilterAndPaginationDto, UpdateViewerDto } from './dto';
import { PetsService } from './pets.service';
import { ResponsePet, ResponsePetsBirthday } from './swagger';

@Controller('pets')
@ApiTags('Pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get('/birthday')
  @ApiResponse(internalServerErrorTypeSwagger)
  @ApiOperation({ summary: 'Get birthday information about for all pets', description: 'user id in token' })
  async getPetsBirthday(@UserId() userId: string | null): Promise<ResponsePetsBirthday[]> {
    const pets = await this.petsService.getPetsBirthday(userId);

    return this.petsService.mappedPetsBirthday(pets);
  }

  @Get('/:id')
  @ApiResponse(internalServerErrorTypeSwagger)
  @ApiResponse(badRequestErrorSwagger)
  @ApiOperation({ summary: 'Get information about pet', description: 'user id in token' })
  async getPet(@UserId() userId: string | null, @Param('id', new ParseUUIDPipe()) petId: string): Promise<ResponsePet> {
    const pet = await this.petsService.getPet(userId, petId);

    return this.petsService.mappedPet(userId, pet);
  }

  @Post()
  @ApiResponse(unprocessableEntityErrorSwagger)
  @ApiResponse(internalServerErrorTypeSwagger)
  @ApiOperation({ summary: 'Adding new pet' })
  @ApiResponse(createEntityResponseOnlyIdSwagger)
  @UsePipes(new BackendValidationPipe())
  async addPet(@UserId() userId: string | null, @Body() addPetDto: AddPetDto) {
    const pet = await this.petsService.addPet(userId, addPetDto);

    return { id: pet.id };
  }

  @Put('/:id')
  @ApiResponse(unprocessableEntityErrorSwagger)
  @ApiResponse(internalServerErrorTypeSwagger)
  @ApiResponse(okEntityResponseOnlyIdSwagger)
  @ApiResponse(badRequestErrorSwagger)
  @ApiOperation({ summary: 'Update pet', description: 'user id in token' })
  @UsePipes(new BackendValidationPipe())
  async updatePet(
    @Body() updatePetDto: AddPetDto,
    @UserId() userId: string | null,
    @Param('id', new ParseUUIDPipe()) petId: string,
  ) {
    await this.petsService.updatePet(userId, petId, updatePetDto);

    return { id: petId };
  }

  @Delete('/:id')
  @ApiResponse(internalServerErrorTypeSwagger)
  @ApiResponse(okEntityResponseOnlyIdSwagger)
  @ApiResponse(badRequestErrorSwagger)
  @ApiOperation({ summary: 'Remove pet', description: 'user id in token' })
  async removePet(@UserId() userId: string | null, @Param('id', new ParseUUIDPipe()) petId: string) {
    await this.petsService.removePet(userId, petId);

    return { id: petId };
  }

  @Patch('/:id/viewer')
  @ApiResponse(unprocessableEntityErrorSwagger)
  @ApiResponse(internalServerErrorTypeSwagger)
  @ApiResponse(okEntityResponseOnlyIdSwagger)
  @ApiResponse(badRequestErrorSwagger)
  @ApiOperation({ summary: 'Update viewers for pet', description: 'user id in token' })
  @UsePipes(new BackendValidationPipe())
  async updateViewer(
    @Body() updateViewerDto: UpdateViewerDto,
    @UserId() userId: string | null,
    @Param('id', new ParseUUIDPipe()) petId: string,
  ) {
    await this.petsService.updateViewer(userId, petId, updateViewerDto);

    return { id: petId };
  }

  @Get()
  @ApiResponse(unprocessableEntityErrorSwagger)
  @ApiResponse(internalServerErrorTypeSwagger)
  @ApiOkResponsePaginated(ResponsePet)
  @ApiOperation({
    summary: 'Get list pets with filtering and pagination',
  })
  @UsePipes(new BackendValidationPipe())
  async getPetsWithFilterAndPagination(
    @UserId() userId: string | null,
    @Query() filter: GetPetsWithFilterAndPaginationDto,
  ) {
    const [list, total] = await this.petsService.getPetsWithFilterAndPagination(filter);

    return { list: this.petsService.mappedPets(userId, list), pagination: getPaginationObject(filter, total) };
  }
}
