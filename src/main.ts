import { StorageUtility } from './utils/storage';

//Interface för att säkerhetsställa att alla värden skrivs in korrekt. 
interface courseInfo {
  code: string;
  name: string;
  progression: 'A' | 'B' | 'C';
  syllabus: string;
}

//Hämtar mina html element

const courseForm = document.getElementById('courseForm') as HTMLFormElement;
const courseCode = document.getElementById('courseCode') as HTMLInputElement;
const courseName = document.getElementById('courseName') as HTMLInputElement;
const progression = document.getElementById('progression') as HTMLSelectElement;
const syllabus = document.getElementById('syllabus') as HTMLInputElement;

courseForm.addEventListener('submit', (e) => {
  e.preventDefault(); //Så sidan inte laddas om hela tiden

//skapar objekt för kursstrukturen utifrån mitt interface 
const newCourse: courseInfo = {
  code: courseCode.value,
  name: courseName.value,
  progression: progression.value as 'A' | 'B'
};

console.log("Ny kurs", newCourse)

});

