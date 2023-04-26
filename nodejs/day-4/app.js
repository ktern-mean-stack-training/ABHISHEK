//====EXPRESS========
const express =require("express");
const app = express();
app.use(express.json())

//====JWT=========
const jwt = require('jsonwebtoken')
const secretkey = 'mysecret'

//====Mongodb=====
dbUrl = "mongodb://localhost:27017"
const userModel = require("./mongo");   // to import the mongodb file
const { MongoClient, ObjectId } = require("mongodb");

//=====MIDDLE========
// const verify = require('./middle')   


//To register the student and saving the data into database
app.post("/register", async (req,res)=>{        
    dbUrl = "mongodb://localhost:27017"  //url of the database
    dbName = "CLASS"                    //name of the db working on
    const userdetails = req.body;       // variable to assign the user input
    const addUser = await userModel.addUserDetails(dbUrl, dbName, userdetails) //variable to call the required function 
                                                                //(moves to mongo file, with parsing url and name of the 
                                                                // db, along with user input)

    res.send({                  //sending the res to the client
        // addUser,
        msg:"student register successfully"
    
    })
})

//To give the marks for each student [a post to method, to give marks for each student]

app.post("/addmarks", async(req,res)=>{
    dbName = "CLASS"
    const userdetails = req.body;
    const addmarks = await userModel.addmarks(dbUrl,dbName, userdetails)

    res.send({
        msg: "marks added successfully"
    })
})

// To authenticate the student and giving him an authorization token

app.get("/login", async (req, res, next)=>{
dbUrl ="mongodb://localhost:27017"
dbName = "CLASS"

const userdetails = req.body;

const usermail = req.body.email;
const password = req.body.password

const getUser = await userModel.getUserDetails(dbUrl,dbName, usermail, password)
// to check the user details and generating a autherization token
if (getUser !== null){
    const token = jwt.sign(getUser, secretkey, { expiresIn: '1h' });

    //to route object id of the user with the refid of marks collection
    const client = await MongoClient.connect(dbUrl);

    Obj = getUser._id.toString()

    const marks = await client
        .db(dbName)
        .collection("marks")
        .findOne({refid: Obj})

    if (marks !== null){
        res.send({
            token
        })
    }

    else{
        res.send({msg: "marks are not found for this user"})
    }

    name = getUser.email
    // console.log(marks)
    // console.log(getUser._id)
    // console.log(Obj)
    console.log(req.headers.authorization) // to access the token
    // res.send({
    //     marks, name, token
    // })

}

else {
    res.status(401).send({error: "invalid email or password"})

}
});


//=====MIDDLEWARE code for authorization========
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, secretkey, (err, user) => {
        if (err) {
          return res.send("invalid token, check with it again");
        }
        req.user = user;
        next();
      });
    } else {
      res.send("token should be present in autherization header");
    }
  };

// To get the marks of the authenticated user upon keeping the token in headers.authorization

app.get("/showmarks", verifyToken, async (req, res) => {
    const dbName = "CLASS";
    const client = await MongoClient.connect(dbUrl);
  
    const marks = await client
      .db(dbName)
      .collection("marks")
      .findOne({ refid: req.user._id.toString() });
  
    if (marks !== null) {
      res.send(marks)}





    })

//========================================
app.listen(4000, () => {
    console.log("app running on port 4000");
  });
//========================================