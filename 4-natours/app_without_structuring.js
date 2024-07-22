const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');

//MIDDLEWARES---------------------------------------------
//3rd party Middleware use
app.use(morgan('dev'));
app.use(express.json());

//custom middleware
app.use((req, res, next) => {
  console.log('Middleware 1');
  next();
});

//altering data inside middleware.
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//Dummy get and post implementation.
// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'json formate response from express app.',
//     express: 'NodeJs framework!',
//   });
// });

// app.post('/post', (req, res) => {
//   res.send('Configured POST call in app');
// });

//ROUTES Function---------------------------------------------------------
const read_data = JSON.parse(
  fs.readFileSync(
    './dev-data/data/tours-simple.json'
  )
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: read_data.length,
    data: { read_data },
  });
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > read_data.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invaild ID',
    });
  }
  res.status(200).json({
    status: 'success',
    message:
      'Patch not implemented as DB is still not attached!',
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > read_data.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invaild ID',
    });
  }
  res.status(204).json({
    status: 'success',
    message: null,
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = read_data.find(
    (el) => el.id === id
  );

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invaild ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId =
    read_data[read_data.length - 1].id + 1;
  const newTour = Object.assign(
    { id: newId },
    req.body
  );
  read_data.push(newTour);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(read_data),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  console.log(req.body);
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
/*We have not implemented the patch and delete functionality as
in real world we never will be implementing this way we always have 
DB.

This is one way of implementing CRUD we can refactor more using route
and make is more prettier.
*/

/*app.get('/api/v1/tours', getAllTours);
app.post('/api/v1/tours', createTour);

app.get('/api/v1/tours/:id', getTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);
*/

//using route-----------------------------------------------------
/*app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
*/
/*Using mounting functionality of routes with middleware*/

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser);

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//Server-----------------------------------------------------------
const port = 3000;
app.listen(port, () =>
  console.log(`App is running on port ${port}`)
);
