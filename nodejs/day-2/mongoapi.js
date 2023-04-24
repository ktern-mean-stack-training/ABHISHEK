//mongo db

const { MongoClient, ObjectId } = require("mongodb");


//to add or register students
module.exports.addUserDetails = async(url,dbName, userData)=>  {   //exporting the module that has arguments that are shared via calling.
    const client = await MongoClient.connect(url)  //creating a promise and waiting for the client to respond
    const addUser = client  //variable to perform the function
        .db(dbName)   // name of the db [shared via arguments]
        .collection("users")  //name of the collection in the db
        .insertOne(userData)    //inserOne: used to insert a data in the db

    return addUser;  //returning the above variable
 
}

//to update students

module.exports.updateUserDetails= async(url,dbName, userId, updateData)=>{
    const client = await MongoClient.connect(url)
    const updateUser = client
        .db(dbName)
        .collection("users")
        .updateOne({_id: new ObjectId(userId)}, { $set: updateData }); 

    return updateUser;

}

// to delete students

module.exports.deleteUserDetails = async(url, dbName, userId)=>{
    const client = await MongoClient.connect(url)
    const deleteUser = await client
        .db(dbName)
        .collection("users")
        .deleteOne({_id: new ObjectId(userId)})

        client.close();
}

// to retrieve single student

module.exports.singleUserDetails = async (url, dbName, userId)=> {
    const client = await MongoClient.connect(url)
    const findUser = await client
        .db(dbName)
        .collection("users")
        .findOne({_id : new ObjectId(userId)})

        // client.close();

        return findUser
}

// to retrive all the students

module.exports.allUserDetails = async(url, dbName,) => {
    const client = await MongoClient.connect(url)
    const findUser = await client
        .db(dbName)
        .collection("users")
        .find()
        .toArray()

    return findUser
}

// to get percentage

module.exports.getPercentage = async(url, dbName) => {
    const client = await MongoClient.connect(url)
    const percentage = await client
        .db(dbName)
        .collection("users")
        .aggregate([
            {
                $project:{

                    name: 1,
                    maths: 1,
                    physics:1,
                    chemistry:1,
                    english:1,
                    
                    
                    percentage: {$divide: [{$add: ["$maths","$physics","$chemistry","$english"]},4]}
                    
                }
            }


        ])
        .toArray()
        
        return percentage

}

// to get students with >80 percentage

module.exports.getEligible = async(url, dbName)=>{
    const client = await MongoClient.connect(url)
    const percentage = await client
        .db(dbName)
        .collection("users")
        .aggregate([
            {
                $project:{
                    _id:1,
                    name: 1,
                    maths: 1,
                    physics:1,
                    chemistry:1,
                    english:1,
                    
                    percentage: {$divide: [{$add: ["$maths","$physics","$chemistry","$english"]},4]}
                }
            },

            {
                $match:{
                    percentage: {$gt: 80}
                }
            }

        ])
        .toArray()

        return percentage
}

module.exports.cutOff = async(url,dbName)=>{
    const client = await MongoClient.connect(url)
    const cutoff = await client
        .db(dbName)
        .collection("users")
        .aggregate([
            {
                $project:{
                    name: 1,
                    maths: 1,
                    physics:1,
                    chemistry:1,
                    english:1,
                    
                    // cutoff: {$add:[{$divide:["$maths",0.5]},{$divide:["$physics",0.25]},{$divide:["$chemistry",0.25]}]}
                    cutoff: {$divide:[{$add:[{$divide:["$maths",0.5]},{$divide:["$physics",0.25]},{$divide:["$chemistry",0.25]}]},10]}

                    
                }
            },
            {
                $match:{
                    cutoff: {$gt: 80}
                }
            

            }
        ])
        .toArray()

        return cutoff
}




