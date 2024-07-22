const fs = require('fs');

const read_data = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: read_data.length,
    data: { read_data },
  });
};

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
  const newId =
    read_data[read_data.length - 1].id + 1;
  const newTour = Object.assign(
    { id: newId },
    req.body
  );
  read_data.push(newTour);
  fs.writeFile(
    '${__dirname}/../dev-data/data/tours-simple.json',
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
