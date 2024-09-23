const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    name: {type: String, required: true, unique:true},
    password: {type: String, required: true}
});

const Anime = new Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    image: {type: String, required: true},
    id: {type: Number, required: true},
    status: {type: String, required: true},
    episodesWatched : {type: Number},
    rating: {type: Number}
})

const UserModel = mongoose.model('users', User)
const AnimeModel = mongoose.model('animes', Anime)

module.exports = {
    UserModel : UserModel,
    AnimeModel : AnimeModel
}