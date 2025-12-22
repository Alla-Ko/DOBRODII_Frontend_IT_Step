import { AdoptionApplication } from './adoptionApplication';

export interface SuccessStory {
  id: string;
  slug?: string;
  title: string;
  adoptionApplicationId?: string;
  adoptionApplication?: AdoptionApplication;
  photos: string[]; 
  videos: string[]; 
  description: string;
  shortDescription?: string;
  createdAt: string;
  updatedAt: string;
}
