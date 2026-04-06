
//Hämtar sparade kurser från webbläsarens minne direkt när sidan laddas
import { StorageUtility, StorageKeys } from './utils/storage';

//Om minnet är tomt (null), skapar vi en tom lista [] så att programmet inte kraschar.
let courseList: courseInfo[] = StorageUtility.getItem<courseInfo[]>(StorageKeys.COURSES) || [];

//Interface för att säkerhetsställa att alla värden skrivs in korrekt. 
interface courseInfo {
  code: string;
  name: string;
  progression: 'A' | 'B' | 'C';
  syllabus: string;
}

//Hämtar mina html element och använder as html 

const courseForm = document.getElementById('courseForm') as HTMLFormElement;
const courseCode = document.getElementById('courseCode') as HTMLInputElement;
const courseName = document.getElementById('courseName') as HTMLInputElement;
const progression = document.getElementById('progression') as HTMLSelectElement;
const syllabus = document.getElementById('syllabus') as HTMLInputElement;
const courseTable = document.getElementById('courseTable') as HTMLDivElement;
const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;

courseForm.addEventListener('submit', (e) => {
  e.preventDefault(); //Så sidan inte laddas om hela tiden

//skapar objekt för kursstrukturen utifrån mitt interface 
const newCourse: courseInfo = {
  code: courseCode.value,
  name: courseName.value,
  progression: progression.value as 'A' | 'B' | 'C',
  syllabus: syllabus.value,
};

//kontroll för dubletter kurskod
const isDuplicate = courseList.some(course => course.code === courseCode.value);
if (isDuplicate) {
  alert("Kurskoden måste vara unik! Denna kurs finns redan");
  return; //Avbryt funktionen så kursen ej läggs till
}
//"Puttar in värdet användaren skrivit ner in i min array courseList"
courseList.push(newCourse);

StorageUtility.setItem(StorageKeys.COURSES, courseList); // SPARAR: Här skickar vi hela den uppdaterade listan till localStorage. Utan denna rad försvinner den nya kursen om  sidan laddas om 

displayCourses();
courseForm.reset();

});

//Händelselyssnare för att rensa formuläret 
clearBtn.addEventListener('click', () => {
  courseForm.reset();
  });

  function displayCourses(): void {  
  //Tabellens struktur nedan. Här rensas den gamla tabellen och ritar upp en ny tom tabell med rubriker. Genom att använda = istället för += så töms allt gammalt innehåll först.
courseTable.innerHTML = ` 
<table>
<thead>
<tr>
<th>Kurskod</th>
<th>Namn</th>
<th>Progression</th>
<th>Kursplan</th>
</tr>
</thead>
<tbody id="courseBody"></tbody>
</table>
`;

const courseBody = document.getElementById('courseBody') as HTMLElement;

//Loopa igenom och fyll på rader i min tabell
courseList.forEach((course, index) => {
  courseBody.innerHTML += `
  <tr>
  <td>${course.code}</td>
  <td>${course.name}</td>
  <td>${course.progression}</td>
  <td> <a href="${course.syllabus}" target="_blank">Länk </a> </td>
  <td><button class="delete-btn" data-index="${index}">Radera</button></td>
  </tr>`;
  
});

addDeleteListeners(); 
}

function addDeleteListeners(): void {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const target = e.target as HTMLButtonElement;
      const index = parseInt(target.getAttribute('data-index') || "0"); //Hämtar siffran från "data-index" för att veta vilken rad som klickades på 
    
      courseList.splice(index, 1); //Tar bort 1 element ur course-list på specifik position (index)

      //Uppdatera localStorage med nya listan
      StorageUtility.setItem(StorageKeys.COURSES, courseList);

      displayCourses(); //Rita om tabellen så raden försvinner från skärmen
    });
  });
}

displayCourses(); //anropar för att det som är sparat ska synas även om ingen tryckt på knappen lägg till i formuläret