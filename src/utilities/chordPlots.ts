import { TvShow } from '../components/TV Ratings/TvRatingsList';

export const tvShowsToGenreMatrix = (shows: TvShow[], genres: string[]) => {
    var matrix = (new Array(genres.length)).fill(undefined).map(_ => (new Array(genres.length)).fill(undefined));

    for (var primaryGenre = 0; primaryGenre < genres.length; primaryGenre++) {
        for (var secondaryGenre = 0; secondaryGenre < genres.length; secondaryGenre++) {
            var showsWithBothGenres = 0;

            shows.forEach(show => {
                if (!(show.genres.includes(genres[primaryGenre]) && show.genres.includes(genres[secondaryGenre]))) { return; }

                if (primaryGenre !== secondaryGenre) {
                    showsWithBothGenres++;
                }
                else {
                    // only add a chord from a genre to itself if the show is just that one genre
                    if (show.genres.length === 1) {
                        showsWithBothGenres++;
                    }
                }
            })

            matrix[primaryGenre][secondaryGenre] = showsWithBothGenres;
        }   
    }

    return matrix;
};