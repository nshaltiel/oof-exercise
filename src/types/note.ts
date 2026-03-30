import { Timestamp } from 'firebase/firestore';
import { BinType } from './bin';

export interface Note {
  id: string;
  text: string;
  teacherToken: string;
  bin: BinType | null;
  sortedAt: Timestamp | null;
  createdAt: Timestamp;
}
