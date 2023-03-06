// Import the 'fs' module
const fs = require('fs');

// Define a 'Data' class with two properties, 'students' and 'courses'
class Data {
     constructor(students , courses) {
          this.students = students;
          this.courses = courses;
     }
}

// Define a global variable 'dataCollection' to store an instance of the 'Data' class
dataCollection = null;

// Exports a function 'initialize' that returns a Promise
exports.initialize = () => {
     return new Promise(async function(Resolve, Reject) {
          try {
               let courseDataFromFile, studentDataFromFile;
               // Check if the 'student.json' and 'courses.json' files exist in the './data' directory
               if(!fs.existsSync("./data/student.json")) {
                    Reject("student.json file does not exist");
               }
               if(!fs.existsSync("./data/courses.json")) {
                    Reject("courses.json file does not exist");
               }

               // Read the contents of the 'student.json' and 'courses.json' files
               studentDataFromFile = await fs.promises.readFile("./data/student.json", 'utf8');
               courseDataFromFile = await fs.promises.readFile("./data/courses.json", 'utf8');

               // Check if the contents of the files are properly read
               if(studentDataFromFile == undefined) {
                    Reject("unable to read students.json");
               }
               if(courseDataFromFile == undefined) {
                    Reject("unable to read courses.json");
               }

               // Create an instance of the 'Data' class and store it in the 'dataCollection' variable
               dataCollection = await new Data(JSON.parse(studentDataFromFile), JSON.parse(courseDataFromFile));

               // Return a success message 
               Resolve("Successfully initialized");
          } catch (err) {
               // Reject if there any error
               Reject(err.message);
          }
     });
};

// Exports a function 'getStudentsByCourse' that returns a Promise
exports.getStudentsByCourse = (course) => {
     return new Promise(async function(Resolve, Reject) { 
          try{
               // Reject if the course Parameter is undefined
               if(course == undefined) {
                    Reject("course parameter is undefined")
               }

               // Filter the students to only whose course value = course
               let filter = (!dataCollection || dataCollection.students == undefined)? [] : dataCollection.students.filter(x => x.course == course);
               
               // Reject if the 'dataCollection' variable is not properly initialized
               if(!dataCollection || dataCollection.students == undefined) {
                    Reject("DataCollection Object not initialized")
               }
               
               // Reject if there are no any students match
               if(filter.length == 0) {
                    Reject("no results returned")
               }

               // Resolve with Filter Data
               else{
                    Resolve(filter)
               }
          }catch (err){
               // Reject if there any error
               Reject(err.message)
          }
     })
};

// Exports a function 'getStudentByNum' that returns a Promise
exports.getStudentByNum = (num) => {
     return new Promise(async function(Resolve, Reject) { 
          try{
               // Reject if the num Parameter is undefined
               if(num == undefined) {
                    Reject("num parameter is undefined")
               }

               // Filter the student to only whos studentNum = num
               let filter = (!dataCollection || dataCollection.students == undefined)? [] : dataCollection.students.filter(x => x.studentNum == num);
               
               // Reject if the 'dataCollection' variable is not properly initialized
               if(!dataCollection || dataCollection.students == undefined) {
                    Reject("DataCollection Object not initialized")
               }
               
               // Reject if there are no any students match
               if(filter.length == 0) {
                    Reject("no results returned")
               }

               // Resolve with Filter Data
               else{
                    Resolve(filter[0])
               }
          }catch (err){
               // Reject if there any error
               Reject(err.message)
          }
     })
};



// Exports a function 'getAllStudents' that returns a Promise
exports.getAllStudents = () => {
     return new Promise(async function(Resolve, Reject) {
          try {
               // Reject if the 'dataCollection' variable is not properly initialized
               if(!dataCollection || dataCollection.students == undefined) {
                    Reject("DataCollection Object is not initialized");
               }
               // Reject if there are no any students in the 'students' array
               else if(dataCollection.students.length == 0) {
                    Reject("no results returned");
               }

               // Return a success message with the number of students
               else {
                    Resolve(dataCollection.students);
               }
          } catch (err) {
               // Reject if there any error
               Reject(err.message);
          }
     });
};

// Exports a function 'getTAs' that returns a Promise
exports.getTAs= () => {
     return new Promise(async function(Resolve, Reject) { 
          try{
               // Filter the students to only include those who are TAs true
               let filter = (!dataCollection || dataCollection.students == undefined)? [] : dataCollection.students.filter(x => x.TA == true);
               
               // Reject if the 'dataCollection' variable is not properly initialized
               if(!dataCollection || dataCollection.students == undefined) {
                    Reject("DataCollection Object not initialized")
               }
               
               // Reject if there are no any students that have TAs true
               if(filter.length == 0) {
                    Reject("no results returned")
               }

               // Resolve with a success message and the number of TAs retrieved
               else{
                    Resolve(filter)
               }
          }catch (err){
               // Reject if there any error
               Reject(err.message)
          }
     })
};

// exports the getCourses method, which returns a Promise
exports.getCourses = () => {
     return new Promise(async function(Resolve, Reject) { 
          try{
                // Reject if the 'dataCollection' variable is not properly initialized
               if(!dataCollection || dataCollection.courses == undefined) {
                    Reject("DataCollection Object is not initialized")
               }

               // Reject if there are no any courses in the 'courses' array
               if(dataCollection.courses.length == 0) {
                    Reject("no results returned")
               }
                // Return a success message with the number of courses
               else{
                    Resolve(dataCollection.courses)
               }
          }catch (err){
               // Reject if there any error
               Reject(err.message)
          }
     })
};

// Exports a function that store new student
exports.addStudent = (data) => {
     return new Promise(async function(Resolve, Reject) { 
          try{
               // Reject if the 'dataCollection' variable is not properly initialized
               if(!dataCollection || dataCollection.students == undefined) {
                    Reject("DataCollection Object not initialized")
               }
               
               if(data.TA) {
                    data.TA = true;
               }
               else{
                    Object.assign(data,{TA:false});
               }

               Object.assign(data,{studentNum:dataCollection.students.length+1})

               dataCollection.students.push(data);
               // Resolve with a success message
               Resolve("Successfully Saved")
               
          }catch (err){
               // Reject if there any error
               Reject(err.message)
          }
     })
};