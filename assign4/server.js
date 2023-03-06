// Import the initialize, getAllStudents, getTAs,getStudentByNum,getStudentsByCourse and getCourses functions from the collegeData module.
const {initialize,getAllStudents,getTAs,getCourses,getStudentByNum,getStudentsByCourse,addStudent} = require('./modules/collegeData');

// Import the required modules and set up the Express app
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

app.use(express.static(__dirname+ "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The route, "/", serves the home.html file as a response when a GET request is made to the root path of the server.
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});

// The route, serves the about.html file as a response when a GET request is made to the "/about" path of the server.
app.get("/about", (req, res) => {
    return res.sendFile(__dirname +"/views/about.html");
});

// The  route, "/htmlDemo", serves the htmlDemo.html file as a response when a GET request is made to the "/htmlDemo" path of the server.
app.get("/htmlDemo", (req, res) => {
    return res.sendFile(__dirname +"/views/htmlDemo.html");
});

// The  route, "/addStudent", serves the addStudent.html file as a response when a GET request is made to the "/addStudent" path of the server.
app.get("/addStudent", (req, res) => {
    return res.sendFile(__dirname +"/views/addStudent.html");
});

// The  route, "/addStudent", Saving new student
app.post("/students/add", (req, res) => {
    addStudent(req.body).then((result) => {
        // Redirect
        res.redirect("/students")
    }).catch((err) => {
        // If there is an error, return a JSON response with a message of "no results"
        return res.json({message:"no results"})
    });
});

// The  route, "/students",  Serve a JSON response containing students data when a GET request is made
app.get("/students", (req, res) => {
    // Check if a "course" query parameter is present in the request
    if(req.query.course){
        // If "course" query parameter is present, call the getStudentsByCourse function with the course value
        getStudentsByCourse(req.query.course).then((result) => {
            // Return the result as a JSON response
            return res.json(result)
        }).catch((err) => {
            // If there is an error, return a JSON response with a message of "no results"
            return res.json({message:"no results"})
        });
    }
    // Check if there are no query parameters present in the request
    else if(Object.keys(req.query).length < 1){
        // If no query parameters are present, call the getAllStudents function
        getAllStudents().then((result) => {
            // Return the result as a JSON response
             return res.json(result)
        }).catch((err) => {
            // If there is an error, return a JSON response with a message of "no results"
            return res.json({message:"no results"})
        });
    }
    // If a query parameter is present but it is not "course", return a JSON response with a message of "Query name is not supported"
    else{
        return res.json({message:"Query name is not supported"})
    }
});

// Serve a JSON response containing TA data when a GET request is made to the "/tas" path of the server
app.get("/tas", (req, res) => {
    // Call the getTAs function
    getTAs().then((result) => {
        // Return the result as a JSON response
        return res.json(result)
    }).catch((err) => {
        // If there is an error, return a JSON response with a message of "no results"
        return res.json({message:"no results"})
    });
});

// The  route, "/courses",  Serve a JSON response containing course data when a GET request is made
app.get("/courses", (req, res) => {
    // Call the getCourses function
    getCourses().then((result) => {
        // Return the result as a JSON response
        return res.json(result)
    }).catch((err) => {
        // If there is an error, return a JSON response with a message of "no results"
        return res.json({message:"no results"})
    }); 
});

// Serve a JSON response containing a specific student data when a GET request is made to the "/student/:num" path of the server
app.get("/student/:num", (req, res) => {
    // Call the getStudentByNum function with the "num" parameter from the URL
    getStudentByNum(req.params.num).then((result) => {
        // Return the result as a JSON response
        return res.json(result)
    }).catch((err) => {
        // If there is an error, return a JSON response with a message of "no results"
        return res.json({message:"no results"})
    }); 
});


// Serve a JSON response containing a "Page Not Found" message when a GET request is made to any path of the server that doesn't match the previously defined routes
app.get("*", (req, res) => {
    // Return a 404 status code and a JSON response with a message of "Page Not Found"
    return res.status(404).json("Page Not Found");
});

// Call the initialize function and start the server after the promise is resolved
initialize().then((result) => {
    // setup http server to listen on HTTP_PORT
    app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)});
}).catch((err) => {
    // Log an error message if the initialize function returns a rejected promise
    console.log("error: " + err)
});