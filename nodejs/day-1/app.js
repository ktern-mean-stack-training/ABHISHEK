//this is the main file where we are running the code.
// we have to install express [if not present]

//initally after installing express we have to it into our workspace as

const express =require("express"); //initatiing express framework and defining it.

const app = express(); // assigning a variable to call the express the everytime

app.use(express.json()) //to accessing incoming json objects as a readable input

// ================Simple get request======================
// using this get command, we are sending the response to frameWork
app.get("/first",(req,res)=>{  //in the local host routing to "first" and then accepting req and response as args
    res.send({                      // sending the res in the form of string with msg as attribute
        msg: "first get the API"
    })
});
//================ Using input body type====================
// using this post command, we can fetch the userdata and from the first and assigning them to variables and returning them .
app.post("/first",(req,res)=>{
    let userInput =req.body.lastname;  //assigning posted lastname as userInput and same as to another parameter.
    let userInput2 = req.body.name;

    res.send({
        lastname: userInput,
        name: userInput2
    })
})
//=============== Using input params type===================
//here this will post with "params" instead of "body", where the method is like useriput will be posted.
app.post("/second/:id", (req,res)=>{    //getting the id in the routing itself and reflecting it to share as Response.
    const userId = req.params.id;

    res.send({
        userId: userId
    })
});


//===============Using input Query type=====================
//here the query is also an another method to get the user input
app.post("/query",(req,res)=>{
    const userIn =req.query.userIn;

    res.send({
        maths: userIn

    })

});

//initially declaring a constant and assigning to a request and then as like as key value pair, for the declared variable, the user can 
// directly give the input and post it.

//==================================DAY-01 ASSIGNMENT=========================================
let studentDetails =[
    {
        stuId: 1,
        name: "Abhishek",
        english: 40,
        physics: 30,
        maths: 35,                  
        chemistry: 40

    },
    {
        stuId:2,
        name: "swaroop",
        english: 95,                
        physics: 95,          //(95/100)*0.25+(95/100)*0.5+
        maths: 95,
        chemistry: 95
    },

    {
        stuId:3,
        name: "John",
        english: 90,                
        physics: 95,          //(95/100)*0.25+(95/100)*0.5+
        maths: 90,
        chemistry: 98
    }
]


app.post("/studata/:id", (req, res) => {  //studata->name of the router and id is the attribute
    let stuId = parseInt(req.params.id);  // declaring the request data into a variable and converting into integer
    let result;
  
    for (let student of studentDetails) {   //running a loop in the studentDetails db with each student.
      if (student.stuId === stuId) {        // if stuId of database matches with the input id given by the user, then
        let total = (((student.physics)/100)*0.25) + (((student.maths)/100)*0.50) + (((student.chemistry)/100)*0.25);
        // let perc = ((total / 3)).toFixed(2);

        let totalMarks = student.english + student.physics + student.maths + student.chemistry;
  
        result = {
          stuId: student.stuId,
          name: student.name,
          english: student.english,
          physics: student.physics,
          maths: student.maths,
          chemistry: student.chemistry,
          totalMarks: totalMarks,
          CutoffPercentage: (total)*100,
        };
      }
    }
  
    res.send({
      student: result,
    });
  });
  
  //==========================================================
  app.listen(4000, () => {
    console.log("app running on port 4000");
  });
  


