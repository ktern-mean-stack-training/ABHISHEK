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

//To give the marks for each student

module.exports.addmarks= async(url, dbName, userData)=>{
    const client = await MongoClient.connect(url)
    const addmarks = client
        .db(dbName)
        .collection("marks")
        .insertOne(userData)

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










