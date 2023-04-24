//WHAT EVER THE LENGTH OF DATA HERE WE CAN RUN A LOOP ACROSS ALL THE DATA UNTIL THE refif is found and then pushing them into an array.
op=[]
const userid = "4"
data2 =[
    {
        id: "1",
        refif: "10",
        name: "first"
    },
    {
        id: "2",
        refif: "1",
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
    },
    {
        id: "10",
        refif: "25",
        name: "tenth"
    },
    {
        id: "25",
        refif: "",
        name: "twenny-five"
    }
    
]

ref= userid

while (ref){
    const obj = data2.find(ele=>ele.id === ref)

    if (obj){
        op.push(obj.name);
        ref = obj.refif
    }
    else{
        console.log("ref is missing")
        break;
    }
}


console.log(op)