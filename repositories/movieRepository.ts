import {Movie, MovieDocument, MovieModel} from '../models/movie';
import * as imdb from 'imdb-api';
import {Movie as ImdbMovie} from 'imdb-api';

export class MovieRepository {
    getMoviesForUser = async (userId: string) => {
        return await MovieModel.find({userId: userId}).exec() as any as MovieDocument[];
    };

    get = async (userId: string, imdbid: string) => {
        const query = {userId: userId, imdbid: imdbid};
        return await MovieModel.findOne(query).exec() as any as MovieDocument;
    }

    add = async (movie: Movie) => {
        const movieModel = new MovieModel(movie);
        await movieModel.save();
        return this.get(movie.userId, movie.imdbid);
    };

    delete = async (userId: string, imdbid: string) => {
        return await MovieModel.deleteOne({userId: userId, imdbid: imdbid}).exec() as unknown as MovieDocument;
    }

    update = async (userId: string, imdbid: string, movie: Movie) => {
        const query = {userId: userId, imdbid: imdbid};
        await MovieModel.findOneAndUpdate(query, movie, {useFindAndModify: false}).exec();
        return await this.get(userId, imdbid);
    }

    getOnlineDetails = async (movieId: string) => {
        return await imdb.get({id: movieId}, {apiKey: '1e37ecbf'}) as ImdbMovie;
    };

    searchOnline = async (title: string, page: number) => {
        return await imdb.search({name: title, reqtype: 'movie'}, {apiKey: '1e37ecbf'}, page);
    }
}