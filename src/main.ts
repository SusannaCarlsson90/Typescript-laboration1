import { StorageUtility } from './utils/storage';

//Interface för att säkerhetsställa att alla värden skrivs in korrekt. 
interface courseInfo {
  code: string;
  name: string;
  progression: 'A' | 'B' | 'C';
  syllabus: string;
}