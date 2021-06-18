const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://mario:guf6gP82b1Ia16at@cluster0.ffd50.mongodb.net/MEAN-Stack-App?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connected to database')
}).catch(() => {
    console.log('Connection failed')
})