const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect("mongodb+srv://MasonmMasonn:Masonn14@galaxies.b117q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("[✅ DataBase] Connected!");
});
module.exports = mongoose;
