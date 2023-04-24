//==============DAY-03 ASSIGNMENT==================

// ==========================USING ONLY "IF CONDITIONS"======================
//   Expected Output: [""fourth"", ""second"", ""first""]"


op=[]
const userid = "4"
data =[
    {
        id: "1",
        refif: "",
        name: "first"
    },
    {
        id: "2",
        refif: "1",   //====
        name: "second"
    },
    {
        id: "3",
        refif: "2",
        name: "third"
    },
    {
        id: "4",
        refif: "2",
        name: "fourth"
    }
    
]

const obj1 = data.find(ele=>ele.id === userid );
// console.log(obj1.name)
if (obj1){
    op.push(obj1.name)

    id2 = obj1.refif  // here both id and obj should keep on changing
    const obj2 = data.find(ele=>ele.id === id2) //if any of the db id(ie ele.id) mathches with the obj id (ie id2)

    if (obj2){
        // console.log(obj2.name)  
        op.push(obj2.name)
        
        id3= obj2.refif

        const obj3 = data.find(ele=>ele.id === id3)

        if (obj3){
            op.push(obj3.name)
        }

        else {
            console.log('ref id for 3 not found')
        }
        // console.log(obj3.name)
         

    }

    else{console.log("refid for 2 not found for")}
    
    // const obj2 = data
}

else {
    console.log("id not found")
}

// op.push(obj.name)

// console.log(obj) //gives the whole object

// console.log(obj.name)// gives the name of that object
// console.log(op)  //KEEP IT TO RUN "IF CONDITION"


//=============USING LOOPS===========================

op2=[]
ref= userid

while (ref){
    const obj = data.find(ele=>ele.id === ref)

    if (obj){
        op2.push(obj.name);
        ref = obj.refif
    }
    else{
        console.log("ref is missing")
        break;
    }
}

console.log(op) //KEEP IT TO RUN A "WHILE LOOP"

