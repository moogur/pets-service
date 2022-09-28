import { TupleUnion } from 'back-shared-utils/lib/types';

import { ResponsePet } from '../swagger';

export type SortingFieldsKeyType = keyof Pick<
  ResponsePet,
  'gender' | 'animalType' | 'birthDate' | 'breeder' | 'color' | 'name'
>;
export type TupleSortingFieldsKeyType = TupleUnion<SortingFieldsKeyType>;
