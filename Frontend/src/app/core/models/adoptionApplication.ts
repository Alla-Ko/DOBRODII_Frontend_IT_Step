import { Animal } from './animal';
import { User } from './user';
export type AdoptionApplicationtStatus = 'pending' | 'approved' | 'rejected';
export interface AdoptionApplication {
  id: string;
  userId?: string;
  user?: User;
  animalId?: string;
  animal: Animal;

  status: AdoptionApplicationtStatus;
  applicationDate: string;
  comment?: string;
  meetingDate?: string;
  adoptionDate?: string;
  rejectionDate?: string;
  adminNotes?: string;
  rejectionReason?: string;
  curatorName?: string;
  curatorPhone?: string;
  createdAt?: string;
  updatedAt?: string;
  approvedBy?: string;
}
