import { Shelter } from './shelter';

export type AidCategory = 'Food' | 'Medical' | 'Equipment' | 'Other';
export type AidRequestStatus =
  | 'Open'
  | 'InProgress'
  | 'Fulfilled'
  | 'Cancelled';
export interface AnimalAidRequest {
  id: string;
  slug: string;

  shelterId?: string;
  shelter?: Shelter;
  title: string;
  shortDescription?: string;
  description?: string;
  category: AidCategory;
  status: AidRequestStatus;
  estimatedCost: number; 
  allreadyDonated?: number;
  collectedAmount?: number;
  donationsCount?: number;
  photo?: string;
  photos?: string[]; 


}
