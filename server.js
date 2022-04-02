const dotenv = require('dotenv');
dotenv.config({ path: './app' });
const app = require('./app');
const port = process.env.PORT || 3333;

// Index route
app.listen(port, ()=> {
  console.log(`App running on port ${port}!`)
});
