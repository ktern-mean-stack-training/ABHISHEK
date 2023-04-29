//for start,comple,weight
const express = require("express");
const app = express();
app.use(express.json())

const data=[

    //===Parent Object===
    {//first task
    id: 1,
    startedon: "2022-03-03", //yyyy-mm-dd
    completedon: "2022-05-15",
    weightage: 90,
    milestone: 90,
    },
    //===Child Objects===
    {
        //First task L2
        id: 2,
        refid: 1,
        startedon: "2022-10-05",  //mar-03
        completedon: "2019-05-15", //may-15
        weightage: 20,
        milestone: 30,
    },
    {
        //Second task L2
        id: 6,
        refid: 1,
        startedon: "2023-03-05", //mar5
        completedon: "2022-04-25", //apr25
        weightage: 40,
        milestone: 30,
    },
    {
        //third task L3
        id: 12,
        refid: 1,
        startedon: "2022-03-04", //mar-04
        completedon: "2022-03-24", //mar 24
        weightage: 30,
        milestone:30
  
    },
    //===Childest Objects===
    {
        //First task L3
        id: 3,
        refid: 2,
        startedon: "2022-04-01", //apr-01
        completedon: "2019-04-15", //apr-15
        weightage: 15,
        milestone: 10,
      },
      {
        //Second task L3
        id: 4,
        refid: 2,
        startedon: "2020-03-03", //mar3 mar-3
        completedon: "2022-05-15", //may15
        weightage: 10,
        milestone: 10,
      },
      {
        //third task L3
        id: 5,
        refid: 2,
        startedon: "2022-03-05", //mar-05 may-3
        completedon: "2022-03-24", //mar24
        weightage: 5,
        milestone: 10,
      },
      {
        //First Second task L3
        id: 7,
        refid: 6,
        startedon: "2022-03-05", //mar10
        completedon: "2022-03-25", //mar25
        weightage: 60,
        milestone: 30,
      },
    //====Childest Objects====
    {
        //Childest task1
        id: 8,
        refid: 7,
        startedon: "2022-04-01", //apr-1
        completedon: "2020-04-25", //apr-25
        weightage: 20,
        milestone: 7.5,
      },
      {
        //Childest task2
        id: 9,
        refid: 7,
        startedon: "2022-04-05", //apr-05
        completedon: "2023-04-20", //apr-25
        weightage: 10,
        milestone: 7.5,
      },
      {
        //Childest task3
        id: 10,
        refid: 7,
        startedon: "2022-03-25", //mar-25
        completedon: "2022-04-05", //apr-05
        weightage: 10,
        milestone: 7.5,
      },
      {
        //Childest task4
        id: 11,
        refid: 7,
        startedon: "2022-03-05", //mar-05
        completedon: "2022-04-25", //mar-25
        weightage: 10,
        milestone: 7.5,
      } 

]

//============================================FUNCTIONS================================================================================
//==========================GIVES THE CHILD OBJECTS OF THE ID=========================
// to flatten the child tasks
  function flattenArray(nestedArray) {
    return nestedArray.reduce((result, item) => {
      if (Array.isArray(item)) {
        result.push(...flattenArray(item));
      } else {
        result.push(item);
      }
      return result;
    }, []);
  }
// Recursive function to find all child tasks of a given parent task
function getChild(parentId) {
    const child = [];
    for (let task of data) {

        // console.log(task.startedon)
      if (task.refid === parseInt(parentId)) {

        let id = task.id;
        let refid = task.refid;
        let startedon = task.startedon;
        let completedon = task.completedon;
        let weightage = task.weightage;
        let milestone =  task.milestone;

        const date = {
            id, refid,startedon, completedon,weightage,milestone 
        }
        
        const grandChildTasks = getChild(task.id); 
        child.push(date,grandChildTasks);
        // child.push(); //to get the grand child
      }
      








    }

    
      const flatchild = flattenArray(child);
      
      return flatchild;
    


  }
//=====================================================================================

//To get minimum date among the child tasks
function getmin(childtasks){
  console.log("to get minimum date- inside getmin function")

  mindate = childtasks[0].startedon;

  for (i=1;i < childtasks.length;i++){
    if (childtasks[i].startedon<mindate){
      mindate= childtasks[i].startedon
    }
  }

  console.log(mindate);

  return (mindate)
}
//=====================================================================================

//To get maximun date among the child tasks
function getmax(childtasks){
  console.log("to get maximum date- inside getmax function")

  maxdate = childtasks[0].completedon;

  for (i=1; i<childtasks.length;i++){

    if (childtasks[i].completedon>maxdate){

      maxdate = childtasks[i].completedon;

    }
  }

  console.log(maxdate)

  return (maxdate)
}

//=====================================================================================

//To add the weights of the child tasks
function getadd(childtasks){

  let weight =0;
  for (i=0;i<(childtasks.length);i++){
    weight+= childtasks[i].weightage
  }

  console.log(weight,{msg:"weight of the parent id"})

  return weight;
}





//=============================================API'S===================================================================================

// To show all child objects and grand childs of the parent task
app.get("/getchild/:id", (req, res) => {
    const parentId = req.params.id;
    const childObj = getChild(parentId);
    // console.log(childObj,"at app")
    console.log(childObj)
    res.send(childObj);
  });

//=====================================================================================================================================

//To Update the parent components based on the child components
app.put("/updatedates/:id",(req,res)=>{


    const parentId = req.params.id;

    childtasks = getChild(parentId);

    console.log(childtasks.length,{msg:"length of the childtask"})

    console.log(childtasks,{msg:"child objects of the ParentId"});

    //now we have child and childest objects of the parentId
    //to call functions

    if(childtasks.length>1){   //if and only if there is a child task to the parent
    mindate = getmin(childtasks);
    maxdate = getmax(childtasks);
    addweight = getadd(childtasks);

    //to find the index of the item in data array
    const parentIndex = data.findIndex(task => task.id === parseInt(parentId));
    console.log(parentIndex, {msg:"index of the parent in data"})
    if (parentIndex === -1) {
      return res.status(404).send("Parent task not found");
    }

    //to replace the updated data
    data[parentIndex].startedon=mindate;
    data[parentIndex].completedon=maxdate;
    data[parentIndex].weightage=addweight;





    res.send(data[parentIndex])

    }

    // if there is no child task for the parent then,
    else{
      const parentIndex = data.findIndex(task => task.id === parseInt(parentId));
      console.log(parentIndex, {msg:"index of the parent in data"})
      if (parentIndex === -1) {
        return res.status(404).send("Parent task not found");
      }
      res.send(data[parentIndex])
    }

});




































//====================================================================================================================================
app.listen(4000,()=>{
    console.log("app running at port 4000")
});
//====================================================================================================================================

