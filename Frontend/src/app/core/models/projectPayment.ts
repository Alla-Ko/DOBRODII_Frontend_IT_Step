export interface ProjectPayment {
  id: string;
  userName: string;
  userPhotoUrl: string;
  amount: number;
  currency: string;
  donationDate: string;
  isAnonymous: boolean;
  purpose: string;
}
