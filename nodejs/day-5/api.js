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
        milestone: 100,
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
      const flatchild = flattenArray(child); // to merge and keep the nested array as a single array, so that accessing id's are easy
      
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

//=====================================================================================
//To divide the milestone of parent among all the childs
function getmile(childtasks,id,parId){
  
  console.log("=============================");
  console.log("at getmile, first get")
  let parentId = parId

  console.log("=============================");
  console.log("this is the id of the parent:");
  console.log(parentId)

  //==================================================
  parent= data[id];
  console.log("=============================");
  console.log("this is your parent:");
  console.log(parent);
  //==================================================
  let parentmile = parent.milestone;
  console.log("milestone of the parent:");
  console.log(parentmile);
  console.log("=============================");
  //==================================================
  
  let childrens = [];

  let childesttasks=[];
  for (let child of childtasks) {
    if (child.refid === parseInt(parentId)) {
      childrens.push(child);
    }
  }

  console.log("these are childrens of the parent");
  console.log(childrens);

  if (childrens.length>0){
    // let share = Math.floor(parseFloat(parentmile/childrens.length)).toFixed(2);
    let share = parseFloat((parentmile / childrens.length).toFixed(2));
    console.log("share given by the parent to each of its child:");
    console.log(share);
    console.log("=============================")

    for (let child of childrens){
      child.milestone=share;
      let childest = getmilechild(childtasks,child.id,child.milestone)

      childesttasks.push(childest);
      console.log("updated childesttasks:");
      console.log(childesttasks);

      console.log("these are childest task shared by recursive:");
      console.log(childesttasks);//we need this
      

    }

  }
  console.log("Children of the parent with refid", parentId, "in childtasks:");
  console.log(childrens); //we need this

  let mergechild = childrens.concat(childesttasks);
  console.log("these are final output that should be returned:")
  console.log(mergechild);

  return mergechild;
  

  

}

//=====================================================================================================
function getmilechild(childtasks,childid,milestone){

  console.log("at getmilechild, second get")

  let parentmile = milestone
  console.log("childest tasks of",childid,"are:");
  let childrens = [];
  for (let child of childtasks) {
    if (child.refid === parseInt(childid)) {
      childrens.push(child);
    }
  }

  console.log(childrens);

  let childmilestone=[];
  if (childrens.length>0){
    
    // let share = Math.floor(parseFloat(parentmile/childrens.length)).toFixed(2);
    let share = parseFloat((parentmile / childrens.length).toFixed(2));
    console.log("share given by the parent to each of its child:");
    console.log(share);
    console.log("=============================")

    
    for (let child of childrens){
      
      child.milestone=share;
      console.log("pushing into getmilechild")
      console.log(child)
      childmilestone.push(child);
      console.log("updated childmilestone:");
      console.log(childmilestone);
      console.log("getmilechild calling")
      let grandchildren= getmilechild(childtasks,child.id,child.milestone)
      childmilestone = childmilestone.concat(grandchildren);
    }

  }

  console.log("these are chldmilestone :");
  console.log(childmilestone); //here we need this


  
  // return childrens
  return childmilestone //=========================================================
  

}
//=====================================================================================================





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

//========================================roll up approach===============================
//To Update Started date, completed date and weightage of the parent components based on the child components
app.put("/updates/:id",(req,res)=>{


    const parentId = req.params.id;

    childtasks = getChild(parentId);

    console.log(childtasks.length,{msg:"length of the childtask"})

    console.log(childtasks,{msg:"child objects of the ParentId"});

    //now we have child and childest objects of the parentId

    if(childtasks.length>1){   //if and only if there is a child task to the parent

    //====================================
    
    //to find the index of the item in data array
    const parentIndex = data.findIndex(task => task.id === parseInt(parentId));

    console.log(parentIndex, {msg:"index of the parent in data"})
    if (parentIndex === -1) {
      return res.status(404).send("Parent task not found");
    }

    //====================================
    //to call functions
    mindate = getmin(childtasks);
    maxdate = getmax(childtasks);
    addweight = getadd(childtasks);
    // divmile = getmile(childtasks,parentIndex); //this has to be completed
    // console.log(divmile,{msg:"this is the value of divmile"})
    //====================================


    //====================================
    //to replace the updated data
    data[parentIndex].startedon=mindate;
    data[parentIndex].completedon=maxdate;
    data[parentIndex].weightage=addweight;
    // data[parentIndex].milestone=divmile;
    // data[parentIndex].milestone=divmile; this has to be completed
    //====================================


    DATA = {id:data[parentIndex].id,
            refid:data[parentIndex].refid,
            startedon:data[parentIndex].startedon,
            completedon:data[parentIndex].completedon}
          
    // res.send(data[parentIndex]) //sending the updated data of the parent wrt its child tasks

    res.send(DATA)
    }

    // if there is no child task for the parent then,
    else{
      const parentIndex = data.findIndex(task => task.id === parseInt(parentId));
      console.log(parentIndex, {msg:"index of the parent in data"})
      if (parentIndex === -1) {
        return res.status(404).send("Parent task not found");
      }
      res.send(data[parentIndex]) //sending the data of the parent itself, since there are no child tasks
    }

});
//=====================================================================================================================================

//========================================roll Down approach==============================
//To Distribute the milestones of the parent object to their childrens.
app.put("/milestones/:id",(req,res)=>{
  
  const parentId = req.params.id;

  childtasks = getChild(parentId);
  //====================================
  //to find the index of the item in data array
  const parentIndex = data.findIndex(task => task.id === parseInt(parentId));

  console.log("index of the parent in data")
  console.log(parentIndex)
  
  //====================================
  if (parentIndex === -1) {
    return res.status(404).send("Parent task not found");
  }
  //====================================
  
  //To get the child tasks of the parent in the console[for comparision only]
  console.log("length of the childtasks of parentId:");
  console.log(childtasks.length);
  // console.log("child tasks of the parent are:"); 
  // console.log(childtasks);
  //====================================

  if(childtasks.length>1){

    console.log("yes! length of child tasks for id:",parentId,"are >1:")

    mile= getmile(childtasks,parentIndex,parentId) //child tasks along with their parent id of data array

    let parent = data[parentIndex]

    family =[parent,mile]

    res.send(family)

  }

  else{
    res.send(data[parentIndex])
  }

  




});

//====================================================================================================================================
app.listen(4000,()=>{
    console.log("app running at port 4000")
});
//====================================================================================================================================

