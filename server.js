const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const mongoose = require('mongoose');


async function main() {
  try {
    await mongoose.connect('mongodb+srv://rahulcst:6prOi3blwYTlFl0X@cluster0.eep5flt.mongodb.net/?retryWrites=true&w=majority');
  } catch (err) {
    console.log(err);
  }
}

main().catch(err => console.log(err));

const unicornsSchema = new mongoose.Schema({
  name: String,
  loves: [String],
  gender: String,
  weight: Number,
  vampires: Number,
  vaccinated: Boolean,
  dob: Date
});

const aUnicornModel = mongoose.model('unicorns', unicornsSchema);


app.get('/unicorns', async (req, res) => {

  objectToBePassedtoMongoDB = {}
  
  
  if (req.query.uname)
    objectToBePassedtoMongoDB = {
      "name" : req.query.uname
    }
   
  

  if (req.query.ulove) {
    objectTobePassedToTheDB = {
      'loves' : {$in: [req.query.loves.split(',')]}
    }

  }

  // if (req.query.gender)
  //   objectTobePassedToTheDB.gender = req.query.gender
  // if (req.query.weight_gt)
  //   objectTobePassedToTheDB.weight = { ...objectTobePassedToTheDB.weight, $gt: parseInt(req.query.weight_gt) };

  // if (req.query.weight_lt)
  //   objectTobePassedToTheDB.weight = { ...objectTobePassedToTheDB.weight, $lt: parseInt(req.query.weight_lt) };

  // if (req.query.vampires)
  //   objectTobePassedToTheDB.vampires = { $gt: req.query.vampires }

  // if (req.query.vampires) {
  //   objectTobePassedToTheDB.vampires = { $gt: parseInt(req.query.vampires) };
  // }

  // if (req.query.vaccinated)
  //   objectTobePassedToTheDB.vaccinated = req.query.vaccinated === 'true'

  // if (req.query.sort) {
  //   const sorts = req.query.sort.split(',');
  //   sorts.forEach(sort => {
  //     const [field, order] = sort.split('.');
  //     sortObject[field.trim()] = order === 'desc' ? -1 : 1;
  //     console.log(`Sorting by ${field.trim()} in ${order} order`);

  //   });
  //   console.log('Final sortObject:', sortObject);
  // }
  console.log(objectToBePassedtoMongoDB)
  const result = await aUnicornModel.find(objectToBePassedtoMongoDB);
  // const result = await aUnicornModel.find(objectTobePassedToTheDB).sort(sortObject);
  if (result.length > 0) {
    res.json(result);
    return;
  } else {
    res.status(404).send('No unicorns found');

  }
}

);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});     