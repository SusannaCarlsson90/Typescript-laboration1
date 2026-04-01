import { StorageUtility } from './utils/storage';

//Skapar en array som bara får innehålla objekt som ser ut som mitt courseInfo interface
let courseList: courseInfo[] = [];

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
const courseTable = document.getElementById('courseTable') as HTMLDivElement;

courseForm.addEventListener('submit', (e) => {
  e.preventDefault(); //Så sidan inte laddas om hela tiden

//skapar objekt för kursstrukturen utifrån mitt interface 
const newCourse: courseInfo = {
  code: courseCode.value,
  name: courseName.value,
  progression: progression.value as 'A' | 'B' | 'C',
  syllabus: syllabus.value,
};

//"Puttar in värdet användaren skrivit ner in i min array courseList"
courseList.push(newCourse);
console.log(courseList);

//Loopar igenom array och skapar HTML för varje enskild kurs

courseTable.innerHTML = ""; //Töm listan

courseList.forEach((course) => { 
 courseTable.innerHTML += `
<div> 
      <p><strong>Kurskod:</strong> ${course.code}</p>
      <p><strong>Namn:</strong> ${course.name}</p>
      <p><strong>Progression:</strong> ${course.progression}</p>
      <p><strong>Syllabus:</strong> ${course.syllabus}</p>
    </div>
  `;
});
});

