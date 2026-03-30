import { Timestamp } from 'firebase/firestore';

export interface Session {
  id: string;
  principalUid: string;
  principalEmail: string;
  schoolName: string;
  title: string;
  shortCode: string;
  status: 'writing' | 'sorting' | 'review' | 'closed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
