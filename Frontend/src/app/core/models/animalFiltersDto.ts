export interface AnimalFiltersDto {
  page?: number;
  pageSize?: number;
  genders?: string[]; 
  sizes?: string[]; 
  statuses?: string[]; 
  isSterilized?: boolean;
  isUndercare?: boolean;
  minAge?: number;
  maxAge?: number;
  careCosts?: string[]; 
  animalTypeFilter?: string; 
  shelterId?: string;
  specieId?: string;
  breedId?: string;
  search?: string;
}
