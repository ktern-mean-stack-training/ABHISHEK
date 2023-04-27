//mongo db

const { MongoClient, ObjectId } = require("mongodb");


//To register the student and saving the data into database

module.exports.addUserDetails = async(url,dbName, userData)=>  {   //exporting the module that has arguments that are shared via calling.
    const client = await MongoClient.connect(url)  //creating a promise and waiting for the client to respond
    const addUser = client  //variable to perform the function
        .db(dbName)   // name of the db [shared via arguments]
        .collection("users")  //name of the collection in the db
        .insertOne(userData)    //inserOne: used to insert a data in the db

    return addUser;  //returning the above variable
 
}

//To find ID of the students to give marks [to get token for the student ID field]

module.exports.findid= async(url,dbName, userId)=>{
    const client = await MongoClient.connect(url)
    // console.log(userId,"at mongo before calling")

    // id = userId.tostring()
    // console.log(id)

    console.log({_id: new ObjectId(userId)},"before calling at mongo")
    const findid = await client
        .db(dbName)
        .collection('users')
        // .findOne({_id: new ObjectId(userId).toString()})
        .findOne({_id:new ObjectId(userId) })

    console.log(findid,"at mong after calling")

    return findid
}

//To give the marks for each student

module.exports.addmarks= async(url, dbName, userData, userId)=>{
    const client = await MongoClient.connect(url)
    const addmarks = client
        .db(dbName)
        .collection("marks")
        // .insertOne(userData)
        // .insertOne({refid: new ObjectId(userId)},{ userData })
        .insertOne({refid: new ObjectId(userId), userData})

    return addmarks;
}

//To authenticate the student and giving him an authorization token

module.exports.getUserDetails = async(url, dbName, usermail, password)=>{
    const client = await MongoClient.connect(url)

    const getUser = client  
        .db(dbName)
        .collection("users")
        .findOne({email: usermail, password: password})


        // return {user: getUser, ObjectId: getUser._id}
        return (getUser)
        
}










