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
  // userId: string;
  // user?: User; // якщо потрібно
  shelterId?: string;
  shelter?: Shelter;
  title: string;
  shortDescription?: string;
  description?: string;
  category: AidCategory;
  status: AidRequestStatus;
  estimatedCost: number; // Орієнтовна  вартість
  allreadyDonated?: number;
  collectedAmount?: number;
  donationsCount?: number;
  photo?: string;
  photos?: string[]; // Масив URL або ідентифікаторів фото

  // createdAt: string; // ISO дата рядка
  // updatedAt: string; // ISO дата рядка
}
