const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}

module.exports = connectDB;


// mongoose.connect('process.env.MONGOURI', () => {
// 	console.log('connected to mongo');
// });



// const connectDB = async () => {
// 	try {
// 		await mongoose.connect(db, {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true
// 		});

// 		console.log('MongoDB Connected...');
// 	} catch (err) {
// 		console.error(err.message);
// 		process.exit(1);
// 	}
// };

// module.exports = connectDB;