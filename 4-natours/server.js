const dotenv = require('dotenv');
//reading of config.env happens only once per execution.
dotenv.config({ path: './config.env' });
const app = require('./app');
/*
get the env var set by express we can use procees.env 
to get nodejs env var.
in terminal we set env var while running 
~ NODE_ENV= development x=33 nodemon server.js
this commad will set the NODE_ENV & x env var respectively.

This is not feasable to write every time while deploying 
so we can make seperate config.env where you set all the env var
at one place.
*/
// console.log(app.get('env'));
// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
