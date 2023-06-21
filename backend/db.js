const mongoose = require('mongoose')

const url = "mongodb+srv://kshitijchaturvedi265:Ymcaair123@cluster0.coyghoz.mongodb.net/?retryWrites=true&w=majority";

module.exports.connect = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("MongoDB connected successfully")
    }).catch((error)=> console.log("Error:",error))
}