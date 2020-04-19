// Imports the 'mongoose' library, which will allow us to easily interact with our 'MongoDB' database.
const mongoose = require('mongoose');

// Our 'MongoDB' database's URL, retrieved from our '.env' (i.e., environment variables) file.
const URL = process.env.MONGODB_URL;

// We try to establish a connection to our 'MongoDB' database.
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("\nSuccessfully connected to our 'MongoDB' database.\n");
  })
  .catch((error) => {
    console.log("\nIt was not possible to connect to our 'MongoDB' database.\n", error.message);
  });

/* We outline our 'MongoDB' database's schema. This schema will define
the shape of every record (i.e., 'document') in our 'choices' collection. */
const choicesSchema = new mongoose.Schema({
  allChoices: Array,
  pickedChoice: String
});

/* We create our 'MongoDB' database's model. This model will create every
record (i.e., 'document') to be added to our 'choices' collection, and it
will do so according to the previously defined schema. */
const Choice = mongoose.model('Choice', choicesSchema);

// Exports our 'MongoDB' database's 'Choice' model, so as to be used by other modules.
module.exports = Choice;