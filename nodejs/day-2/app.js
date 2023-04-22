//========================JAVA SCRIPT FUNCTIONALITIES========================================
//Using for loop
for (i=0;i<=5;i++){
    text = "the number is "+i;

    // console.log(text);
}
//================================================================
//Iterating over an array using for loop
car=["bmw","audi","swift"]
for (i=0;i<car.length;i++){
    text ="the car is:"+ car[i]
    // console.log(text)
}
//================================================================
//iterating over array objects using "for-in" loop
car = {fname:"abhishek",sname:"reddy",lname:"gotham"}
for (let x in car){
    text=car[x]
    // console.log(text)
}
//================================================================
//Iterating over array using "foreach"
car = [45,12,14,15,16]
car.forEach(numbers)
function numbers(value){
    num=value
    // console.log(num)
}
//================================================================
//Using over a string considering it as an object 
stu = "abhishek"
//for-of
for (x of stu){    //iterates over the values of object
    spell=x
    // console.log(x)
}
//for-in
for (x in stu){   //iterates over the properties or keys of object
    spell=x
    // console.log(x)
}
//================================================================

//using while
i=0
while (i<3){
    text=i
    // console.log(text)
    i++
}
//================================================================
// Iterating over an array using while
fruits = ["apple","banana","guava","melon","papaya"]
i=0
while (i<3){
    fruit = fruits[i]
    // console.log(fruit)
    i++
}
//================================================================

// Iterating over an object
fruits = [{"guava":"red"},{"apple":"green"},{"banana":"white"},{"melon":"yellow"}]
// fruitzzz = {guava:"red",apple:"green",banana:"white"}  to loop over key value pairs      [neglect]
i=0
// const entries = Object.entries(fruitzzz);
while (i<3){
    fruit = fruits[i]
    // fruit1 = fruitzZZ[i] [N]
    // console.log(fruit)
    // console.log(fruit1) [N]
    i++
}
//================================================================
i = 0;
while (i < fruits.length && !Object.keys(fruits[i]).includes("melon")) {
    const currentFruit = fruits[i];
    // console.log(currentFruit);
    i++;
}
//================================================================

//Performing functions on key-value pairs
fruits = {guava:"red",apple:"green",banana:"white"}

for (let ele in fruits){
    fruits.guava = "green"
}

// console.log(fruits)
//================================================================

// javascript function
function Sum(a,b){
    return a+b
}
result = Sum(2,5)
// console.log(result)
//================================================================

// javascript await
async function getprint(time){
    console.log("it will take some time");
    await new Promise(resolve => setTimeout(resolve,time));
    console.log("done")
}
// getprint(6000)

// javascript await
console.log("1")
console.log("2")
console.log(getprint(1000))
console.log("4")
//================================================================

