const Mongoose = require("mongoose");

const { DATABASE } = process.env;

module.exports = (function() {
  Mongoose.Promise = global.Promise;

  return {
    connect() {
      return Mongoose.connect(`mongodb://localhost/${DATABASE}`, {
        useNewUrlParser: true
      })
        .then(() => {
          console.log(`Successfully connected to mongodb => ${DATABASE}`);
        })
        .catch(e => {
          console.error(e);
        });
    },
    disconnect() {
      return Mongoose.disconnect();
    }
  };
})();
