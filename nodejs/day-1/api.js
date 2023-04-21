//=============================DAY-01 ASSIGNMENT============================
//refer notes.txt for clarification
const express =require("express");
const app = express();
app.use(express.json())

/*
==============model database==================
{

    "name":"abhisek",
    "maths":40,
    "phy":49,
    "che":98,
    "eng":99,
    "percentage":90
}
===============================================
*/

const students =[]; //arrays used for storing the student details
const result =[]

let count=1;
//=============1. to add new student========================DONE
app.post("/regi",(req,res)=>{

    let student_name =req.body.name;
    let maths_marks =parseInt(req.body.maths);
    let physics_marks = parseInt(req.body.phy);
    let chemistry_marks = parseInt(req.body.chem);
    let english_marks = parseInt(req.body.eng);


    students.push({
        id:count,
        name:student_name,
        maths:maths_marks,
        physics:physics_marks,
        chemistry:chemistry_marks,
        english:english_marks
    });

    count++

    // console.log(student_name)

    res.send({
        msg: "student register successfully", name:student_name
    })
})

//=======2.to update the details=========================DONE


app.put("/update/:id",(req,res)=>{

    const id = (req.params.id); //initially the id is a string and to perform actions on it, we should convert
    const update=req.body

    for (let student of students){                  //here attributes of both student and update should be same as like as in db.
        if (student.id === parseInt(id)){
            console.log("student found",student.name)
            console.log(student)
            student.name = update.name;
            student.maths = update.maths;
            student.physics = update.phy;
            student.chemistry = update.chem;
            student.english = update.eng;

            res.send({
                msg: "student details updated successfully",
                student //showing the updated data of that id...done
            });
            return;
        }
    }
})

//==========3.to delete the student=============================DONE
app.delete("/delete/:id",(req,res)=>{
    const id = parseInt(req.params.id); 


    for (let i=0; i<students.length;i++){
        console.log("loop is running")
        if (students[i].id===id){
            console.log("id found")
            students.splice(i,1);
            break
        }

        console.log("id not found")
    }

    res.send(students);

})

//=============4.retrieve single student data=====================DONE
app.get("/student_id/:id",(req,res)=>{
    const id = parseInt(req.params.id);

    for (let student of students){
        if (student.id === id){
            res.send(student)
        }
    }

    res.send("student not found")
})

//===============5.retrieve all student details=====================DONE
app.get("/students",(req,res)=>{
    res.send(students)
})

//===========6. along with percentage================DONE

app.get("/perc",(req,res)=>{
    // let result =[]

    for (let student of students){
        let totalMarks =student.maths + student.physics+ student.chemistry+ student.english;
        console.log(totalMarks)
        let percentage =(totalMarks/4);

        console.log(typeof percentage)
        console.log(percentage)

        result.push({
            id: student.id,
            name: student.name,
            maths: student.maths,
            physics: student.physics,
            english:student.english,
            chemistry: student.chemistry,
            percentage: percentage.toFixed(2)
        })
    }


    res.send(result);
})
//===========7. percentage >80=======================DONE
app.get("/elig",(req,res)=>{

    let eligibleStudents = []

    for (let student of students){
        let totalMarks=student.maths + student.physics+ student.chemistry+ student.english;
        let percentage = (totalMarks/4);

        if (percentage > 80){
            eligibleStudents.push({
                id: student.id,
                name: student.name,
                maths: student.maths,
                physics: student.physics,
                english: student.english,
                chemistry: student.chemistry,
                percentage: percentage.toFixed(2)
            })
        }
        
    }

    res.send(eligibleStudents)
})
//===========8. cutofff value >80====================DONE
app.get("/cutoff",(req,res)=>{

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

    res.send(eligibleStudents)
})
//================================================




app.listen(4000, () => {
    console.log("app running on port 4000");
  });