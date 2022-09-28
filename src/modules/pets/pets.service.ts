import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { errorStatusMessages } from 'back-shared-utils/lib/const';
import {
  getISODate,
  prepareArrayContains,
  prepareBetween,
  prepareLike,
  preparePagination,
  prepareSorting,
} from 'back-shared-utils/lib/utils';
import { filter, map, merge } from 'lodash';
import { FindOptionsWhere, Repository } from 'typeorm';

import { AddPetDto, GetPetsWithFilterAndPaginationDto, UpdateViewerDto } from './dto';
import { PetEntity } from './entity';
import { ResponsePetsBirthday } from './swagger';
import { ActionTypeEnum } from './type';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(PetEntity) private readonly petRepository: Repository<PetEntity>) {}

  async addPet(userId: string | null, addPetDto: AddPetDto): Promise<PetEntity> {
    return this.petRepository.save(
      merge(new PetEntity(), addPetDto, { userIdForCreate: userId, userIdsForView: [userId] }),
    );
  }

  async removePet(userId: string | null, petId: string): Promise<void> {
    const result = await this.petRepository.delete({ id: petId, userIdForCreate: userId ?? '' });
    if (!result.affected)
      throw new HttpException(errorStatusMessages[HttpStatus.INTERNAL_SERVER_ERROR], HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async updatePet(userId: string | null, petId: string, updatePetDto: AddPetDto): Promise<void> {
    const pet = await this.findById({ id: petId ?? '', userIdForCreate: userId ?? '' });
    await this.petRepository.save(merge(pet, updatePetDto));
  }

  async updateViewer(userId: string | null, petId: string, updateViewerDto: UpdateViewerDto): Promise<void> {
    if (userId === updateViewerDto.id) return;

    const pet = await this.findById({ id: petId ?? '', userIdForCreate: userId ?? '' });
    if (updateViewerDto.action === ActionTypeEnum.Add) {
      pet.userIdsForView.push(updateViewerDto.id);
    } else {
      pet.userIdsForView = filter(pet.userIdsForView, (id) => id !== updateViewerDto.id);
    }
    await this.petRepository.save(pet);
  }

  mappedPets(userId: string | null, pets: PetEntity[]) {
    return map(pets, (pet) => this.mappedPet(userId, pet));
  }

  mappedPet(userId: string | null, pet: PetEntity) {
    return {
      id: pet.id,
      gender: pet.gender,
      birthDate: getISODate(pet.birthDate),
      animalType: pet.animalType,
      breeder: pet.breeder,
      name: pet.name,
      color: pet.color,
      signs: pet.signs,
      description: pet.description,
      readonly: userId !== pet.userIdForCreate,
    };
  }

  mappedPetsBirthday(pets: PetEntity[]): ResponsePetsBirthday[] {
    return map(pets, (pet) =>
      merge(new ResponsePetsBirthday(), {
        id: pet.id,
        gender: pet.gender,
        birthDate: getISODate(pet.birthDate),
        name: pet.name,
      }),
    );
  }

  async getPet(userId: string | null, petId: string | null) {
    return this.findById({ id: petId ?? '', userIdsForView: prepareArrayContains(userId) });
  }

  async getPetsBirthday(userId: string | null) {
    return this.petRepository.find({ where: { userIdsForView: prepareArrayContains(userId) } });
  }

  async findById(where: FindOptionsWhere<PetEntity>) {
    const pet = await this.petRepository.findOne({ where, cache: true });
    if (pet) return pet;

    throw new HttpException(errorStatusMessages[HttpStatus.NOT_FOUND], HttpStatus.NOT_FOUND);
  }

  async getPetsWithFilterAndPagination(filterDto: GetPetsWithFilterAndPaginationDto) {
    return this.petRepository.findAndCount({
      ...preparePagination(filterDto),
      ...prepareSorting(filterDto),
      where: [
        {
          breeder: prepareLike(filterDto.breeder),
          name: prepareLike(filterDto.name),
          color: prepareLike(filterDto.color),
          gender: filterDto.gender,
          animalType: filterDto.animalType,
          birthDate: prepareBetween(filterDto.birthDateFrom, filterDto.birthDateTo),
        },
      ],
    });
  }
}
