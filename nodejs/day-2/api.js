//=============================DAY-02 ASSIGNMENT============================
//refer notes.txt for clarification
const express =require("express");
const app = express();
app.use(express.json())


const userModel = require("./mongoapi");   // importing the mongodb skeleton

//1. Adding userdetails into mongodb database --DONE
app.post("/register", async (req,res)=>{        
    dbUrl = "mongodb://localhost:27017"  //url of the database
    dbName = "userdb"                    //name of the db working on
    const userdetails = req.body;       // variable to assign the user input
    const addUser = await userModel.addUserDetails(dbUrl, dbName, userdetails) //variable to call the required function 
                                                                //(moves to mongo file, with parsing url and name of the 
                                                                // db, along with user input)

    res.send({                  //sending the res to the client
        // addUser,
        msg:"student register successfully"
    
    })
})

//2. updating userdetails of mongodb --DONE
app.put("/update/:id", async(req,res)=>{
    dbUrl = "mongodb://localhost:27017"
    dbName = "userdb"
    const userId = req.params.id;

    const updateData = req.body

    const updateUser = await userModel.updateUserDetails(dbUrl,dbName,userId, updateData)

    res.send({msg: "updated successfully"});


})

//3. delete the student entry --DONE

app.delete ("/delete/:id",async(req,res)=>{
    dbUrl = "mongodb://localhost:27017"
    dbName = "userdb"
    const userId = req.params.id;
    const deleteUser = await userModel.deleteUserDetails(dbUrl,dbName,userId)

    res.send({
        msg: `User with ID ${userId} deleted successfully`,
      });


})

//4. retrieving a single student --DONE

app.get("/student_id/:id", async(req,res)=>{
    const userId = req.params.id;
    dbUrl = "mongodb://localhost:27017"
    dbName = "userdb"
    
    const findUser = await userModel.singleUserDetails(dbUrl, dbName, userId)

    res.send({
        findUser
        
    })

})

//5. retrieving all the data --DONE

app.get("/students", async(req,res)=>{
    dbUrl = "mongodb://localhost:27017"
    dbName = "userdb"

    const findeUsers = await userModel.allUserDetails(dbUrl, dbName)

    res.send({
        findeUsers
    })
})

// 6. getting the percentage --Done

app.get("/percentage", async(req,res)=>{
    dbUrl = "mongodb://localhost:27017"
    dbName = "userdb"

    const percentage_Users = await userModel.getPercentage(dbUrl,dbName)

    res.send({percentage_Users})
})

// 7. Eligible percentage --DONE

app.get("/eligible", async(req,res)=>{
    dbUrl = "mongodb://localhost:27017"
    dbName = "userdb"

    const EligibleStudents = await userModel.getEligible(dbUrl,dbName)

    res.send({EligibleStudents})


})

// 8. CUTOFF --
app.get("/cutoff", async(req,res)=>{
    dbUrl ="mongodb://localhost:27017"
    dbName="userdb"

    // const Cutoff = await userModel.cutOff(dbUrl,dbName)

    //======
    const students = await userModel.allUserDetails(dbUrl, dbName)
    //=======
    let eligibleStudents = []

    for (let student of students){
        let totalMarks=parseInt((((student.maths)/100)*0.50) + (((student.physics)/100)*0.25)+ (((student.chemistry)/100)*0.25));

        let cutoff = (((student.maths)/100)*0.50)+(((student.physics)/100)*0.25)+(((student.chemistry)/100)*0.25)
        console.log(cutoff)
        let mar =cutoff*100
        console.log(mar)
        // let percentage = (totalMarks/4);

        if (mar > 80){
            eligibleStudents.push({
                id: student.id,
                name: student.name,
                maths: student.maths,
                physics: student.physics,
                english: student.english,
                chemistry: student.chemistry,
                cutoff: ((cutoff)*100)
            })
        }
        // console.log("not found")
    }


    res.send({students})
})


//================================================



app.listen(4000, () => {
    console.log("app running on port 4000");
  });