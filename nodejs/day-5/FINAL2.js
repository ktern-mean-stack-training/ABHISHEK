//A COPY OF FINAL.js JUST FOR REFERENCE

/*
This is an API to update the starteddate and completeddate of a table of tasks data.

along with dates, this also helps us to get the total weightage of the parent depending upon the child, as well as segregating mile
stones to all the child from the parent and to the childest from the child and so on.

here "updates" api is used to do all the above.

upon giving the raw data of tasks with necessary fields such as  ID,REFID,STARTEDON,COMPLETEDON,WEIGHTAGE,MILESTONE.

The api will helps us to give parent tasks min started date, max completed date, overall weightage, segregated milestone.

# sample object to be used as body in the request.
[

    {
    "id": 1,
    "refid":"",
    "startedon": "2023-01-02",
    "completedon": "2023-01-02",
    "weightage": 10,
    "milestone": 270
    },
    
    {
        "id": 2,
        "refid": 1,
        "startedon": "2022-01-02",  //mar-03
        "completedon": "2019-01-02", //may-15
        "weightage": 20,
        "milestone": 30
    },
    [],
    []

  ]

*/
//==================================================================================================================================================
const express = require("express");
const app = express();
app.use(express.json())


//=============================================FUNCTIONS============================================================================================

//=====================================================================================
//To divide the milestone of parent among all the childs
function getmile(childtasks,parentId){
  
    parentmile = childtasks[0].milestone
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
  
    return mergechild; // along with child tasks of parent, here grand child tasks are also included[ie from getmilechild also]
    
  
    
  
  }
  
  //=====================================================================================================
  //consider this as a sub function to run a recursive loop on childest tasks of parent for milestones of grandchild tasks.
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
    return childmilestone // [updating the milestone of childest tasks of parent and sharing it to child tasks array]
    
  
  }
  //=====================================================================================================
  


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
  
    return (mindate) //return the minimum date of parent ID
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
  
    return (maxdate) //returns the maximum date of the parent
  }
  
//=====================================================================================

//To add the weightage of the child tasks
function getadd(childtasks){

    let weight = 0;
    for (i=0;i<(childtasks.length);i++){
      weight+= childtasks[i].weightage
    }
  
    console.log(weight,{msg:"weight of the parent id"})
  
    return weight; //returns the weightage of the parent
  }
//===================================================================================== 


/*

THIS IS THE MAIN FUNCTION THAT SEGREGATES THE TOTAL TASKS INTO PARENT AND ITS CHILD,

UPON GETTING THE CHILD TASKS OF A PARENT, IT CALL THE REQUIRED FUNCTIONS SUCH AS getmin, getmax etc....

Calculates the values that are required and finds the parent of those tasks using refid and updates the 
values of the parent using the returned values.



*/
//function to segregate the data into parent and its child

function segregatedata(data,parentId){

    let parId= parentId;

    console.log("..........................at segregatedata function.................................")
    
    let childrens =[]   //an array to store the childtasks
    
    
    for (let i=1; i<data.length;i++){

    

        if(data[i].refid === parseInt(parId)){
        
        let id = data[i].id;
        let refid = data[i].refid;
        let startedon = data[i].startedon;
        let completedon = data[i].completedon;
        let weightage = data[i].weightage;
        let milestone =  data[i].milestone;

        const date = {
            id, refid,startedon, completedon,weightage,milestone
            
        }
        
        // const grandChildTasks = segregatedata(data,data[i].id);  // a recursive function to fetch grand child tasks 
        // childrens.push(date,grandChildTasks); //if to push the grand child
        childrens.push (date);
    }

    }

    console.log("this is the child of parent:",parId);
    // console.log(childrens)

    
    //==calling functions====

    min = getmin (childrens); //startedon
    max = getmax(childrens);  //completedon
    wei = getadd(childrens);  //weightage
    //=======================
    console.log("this is the min of childrens..........");
    console.log(min)
    console.log("this is the max of childrens.......... ");
    console.log(max)

    //FINDING THE PARENT
    const par = childrens[0].refid
    
    console.log("this is the id of tha parent..................................");
    console.log(par)

    for (let i=0; i<data.length;i++){
        if (data[i].id === par){
            data[i].startedon=min; //updating startedon of parent
            data[i].completedon=max; //updating completedon of parent
            data[i].weightage=wei; //updating weightage of parent
        }
    }

    //====================for grand child====================
    //to get the grandchild of children and should run a loop after the functions on the same grandchild to find childest and further more....
/*
    1. getting the task of childrens.
    2. getting the id of task as taskid
    3. recursing the segregate function with overall data and taskid
    4. at segregate
    5. data and the parent id are present
    6. with parent id as refid of other obj in data
    7. storing them in childrens
    
*/

    for(let i=0;i<childrens.length;i++){
        taskid = childrens[i].id

        for (let j=0;j<data.length;j++){
            if (data[j].refid === taskid){
                segregatedata(data,taskid)
                // i+=1;
        }
        
    }


    }
    console.log(".............................this is the segdata at the function.......................................")
    // console.log(data);



    //========for parent taks=========== 

    // initially the parent task with parenId 0 is being updated with its child tasks 2,6,12
    // but upon further updates in those child tasks because of their childtasks, the parent task is not being updated
    // so to make the parent task also up to date considering those updated child tasks again as childrens of the parent and updating new dates
    let parentchildrens =[]   //an array to store the childtasks
    
    
    for (let i=1; i<data.length;i++){

    

        if(data[i].refid === parseInt(parId)){
        
        let id = data[i].id;
        let refid = data[i].refid;
        let startedon = data[i].startedon;
        let completedon = data[i].completedon;
        let weightage = data[i].weightage;
        let milestone =  data[i].milestone;

        const date = {
            id, refid,startedon, completedon,weightage,milestone
            
        }
        
        // const grandChildTasks = segregatedata(data,data[i].id);  // a recursive function to fetch grand child tasks 
        // childrens.push(date,grandChildTasks); //if to push the grand child
        parentchildrens.push (date);
    }

    }

    console.log("this is the child of parent:",parId,"at seg2");
    console.log(parentchildrens)

    
    //==calling functions====

    min = getmin (parentchildrens); //startedon
    max = getmax(parentchildrens);  //completedon
    wei =getadd(parentchildrens);
    //=======================
    console.log("this is the min of childrens at seg2..........");
    console.log(min)
    console.log("this is the max of childrens at seg2.......... ");
    console.log(max)

    //FINDING THE PARENT
    const par2 = childrens[0].refid
    
    console.log("this is the id of tha parent at seg2..................................");
    console.log(par2)

    for (let i=0; i<data.length;i++){
        if (data[i].id === par2){
            data[i].startedon=min; //updating startedon of parent
            data[i].completedon=max; //updating completedon of parent
            data[i].weightage=wei
        }
    }

    //==========================================================================================
    return (data)
      
    
}

//===================================================================================== 

//================================================APIS==========================================================================


app.put("/updates",(req,res)=>{

    console.log("at updates.....")
    const data = req.body;

    for (let i=0; i<data.length;i++){
      if (data[i].refid===""){
          console.log("this is the parent bro:")
          console.log(data[i].id)
          console.log("===========================================")
          const parentId = data[i].id 
          
          segdata = segregatedata(data,parentId); //this function follows the rolling up approach
          mile = getmile(data,parentId) // this function follows the rollowing down approach

      }
    }
    // const parentId = data[0].id;

    // console.log(data)

    //Sending the data to a function to segregate the parent and its child tasks

    
    //=========================
    res.send(segdata)
    //=========================

});

//====================================================================================================================================
app.listen(4000,()=>{
    console.log("app running at port 4000")
});
//====================================================================================================================================


/*
    const grandchild=[]
    for (let i=0; i<childrens.length;i++){
        for (let j=0; j<data.length;j++){
            if(childrens[i].id === data[j].refid){
                grandchild.push(data[j]); 
            }
        }

        //to find the index of the item in data array
        let parentIndex= data.findIndex(task => task.id === parseInt(childrens[i].id));
        console.log(parentIndex, {msg:"index of the parent in data"})
        if (parentIndex === -1) {
        return res.status(404).send("Parent task not found");
        }

        console.log(grandchild)
        segregatedata(data,parentIndex)

        
    }
*/
