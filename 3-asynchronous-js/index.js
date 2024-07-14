const fs = require("fs");
const superagent = require("superagent");

/*//As below you can see we are going into callback hell.
fs.readFile(`./dog.txt`, (err, data) => {
  console.log(`Breed : ${data}`);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message);
      console.log(res.body.message);
      fs.writeFile("dog-image.txt", res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log("Random dog image saved to file.");
      });
    });
});*/

//-------------------------------------------------------------------------------------------

/*//Now to avoid callback hell in ES6 promises were introduce.
//we are converting writeFile & readFile to Promises.
const readFilePro = (file) => {
  return new Promise((resolve, reject) =>
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find the file");
      resolve(data);
    })
  );
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) =>
    fs.writeFile(file, data, (err) => {
      if (err) reject(`I have trouble writing ${data} to file`);
      resolve("Success!");
    })
  );
};

readFilePro("./dog.txt")
  .then((data) => {
    console.log(`Breed : ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro("./dog-image.txt", res.body.message);
  })
  .then(() => console.log("Random dog image saved to file!"))
  .catch((err) => {
    console.log(err);
  });*/

//-------------------------------------------------------------------------------------------

const readFilePro = (file) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("Trouble reading file!");
      resolve(data);
    });
  });

const writeFilePro = (file, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(`Trouble writing ${data} to file`);
      resolve("Success!");
    });
  });

const getDogImg = async () => {
  try {
    const data = await readFilePro("./dog.txt");
    console.log(`Breed : ${data}`);
    const res1pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    //Promise.all will run all the three promise at same time.
    const all_res = await Promise.all([res1pro, res2pro, res3pro]);
    const img = all_res.map((el) => el.body.message);
    console.log(img);

    // console.log(res.body.message);
    await writeFilePro("./dog-image.txt", img.join("/n"));
    console.log("Random dog image saved to file!");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "return from Async";
};

//this will tell how asyn still work Asynchronously BTS.
/*
Step 1
Step 2
Breed : labrador
https://images.dog.ceo/breeds/labrador/n02099712_1200.jpg
Random dog image saved to file!
*/
// console.log("Step 1");
// getDogImg();
// console.log("Step 2");

/*
You will observe that in async_return var you see pending that is
because Promises are offloaded to Macro task queue by that time 
fn might not have finished executing till the end if you want to 
use these return value you have to either use then or asyn ()();
you'll that below the flow.
output:
Step 1
Promise { <pending> }
Step2
Breed : labrador
https://images.dog.ceo/breeds/labrador/n02099712_7481.jpg
Random dog image saved to file!
*/
// console.log("Step 1");
// const async_return = getDogImg();
// console.log(async_return);
// console.log("Step2");

/*
If you want to catch error in catch then you should be using throw
in async catch block otherwise it won't throw any error.
Output:
Step 1
Breed : labrador
https://images.dog.ceo/breeds/labrador/n02099712_3273.jpg
Random dog image saved to file!
return from Async
Step2
*/
// console.log("Step 1");
// getDogImg()
//   .then((async_return) => {
//     console.log(async_return);
//     console.log("Step2");
//   })
//   .catch((err) => console.log(err));

/*
If you wan't to avoid using .then like we avoided earlier 
instead we used async await similary we can re-write above
pice of code using async await.
*/
(async () => {
  try {
    console.log("Step 1");
    const async_return = await getDogImg();
    console.log(async_return);
    console.log("Step2");
  } catch (err) {
    console.log(err);
  }
})();
