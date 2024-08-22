export type Genre = {
    name: string;
    selected: boolean;
}

export type TvShow = {
    "title": string,
    "rating": number,
    "comment": string,
    "favorite episode": string,
    "image_url": string,
    "genres": Genre[]
}

const Crime: Genre = {
    name: "Crime",
    selected: false
};

const Drama: Genre = {
    name: "Drama",
    selected: false
};

const Thriller: Genre = {
    name: "Thriller",
    selected: false
};

const Fantasy: Genre = {
    name: "Fantasy",
    selected: false
};

const Action: Genre = {
    name: "Action",
    selected: false
}

const Mystery: Genre = {
    name: "Mystery",
    selected: false
};

const SciFi: Genre = {
    name: "Sci-Fi",
    selected: false
};

const Comedy: Genre = {
    name: "Comedy",
    selected: false
};

const Animated: Genre = {
    name: "Animated",
    selected: false
};

export const TvRatingsList : TvShow[] = [
    {
        "title": "Breaking Bad",
        "rating": 9,
        "comment": "",
        "favorite episode": "Dead Freight",
        "image_url": "https://m.media-amazon.com/images/M/MV5BYTU3NWI5OGMtZmZhNy00MjVmLTk1YzAtZjA3ZDA3NzcyNDUxXkEyXkFqcGdeQXVyODY5Njk4Njc@._V1_.jpg",
        "genres": [Crime, Drama, Thriller]
    },
    {
        "title": "Better Call Saul",
        "rating": 9.5,
        "comment": "",
        "favorite episode": "Something Unforgivable",
        "image_url": "https://m.media-amazon.com/images/M/MV5BMTMxOGM0NzItM2E0OS00YWYzLWEzNzUtODUzZTBjM2I4MTZkXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg",
        "genres": [Crime, Drama]
    },
    {
        "title": "Ozark",
        "rating": 6.5,
        "comment": "",
        "favorite episode": "Sanctified",
        "image_url": "https://m.media-amazon.com/images/M/MV5BZDUxMWNlMTUtYTljZS00MTE0LTlkYjktOTU1ODZjYzBhMTk0XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg",
        "genres": [Crime, Drama, Thriller]
    },
    {
        "title": "Game of Thrones",
        "rating": 7,
        "comment": "",
        "favorite episode": "The Mountain And The Viper",
        "image_url": "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
        "genres": [Fantasy, Drama]
    },
    {
        "title": "Lost",
        "rating": 5.5,
        "comment": "",
        "favorite episode": "Three Minutes",
        "image_url": "https://m.media-amazon.com/images/M/MV5BNzhlY2E5NDUtYjJjYy00ODg3LWFkZWQtYTVmMzU4ZWZmOWJkXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
        "genres": [Action, Drama, Mystery],
    },
    {
        "title": "The Wire",
        "rating": 8.5,
        "comment": "",
        "favorite episode": "Sentencing",
        "image_url": "https://m.media-amazon.com/images/M/MV5BNTllYzFhMjAtZjExNS00MjM4LWE5YmMtOGFiZGRlOTU5YzJiXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
        "genres": [Crime, Drama]
    },
    {
        "title": "The Sopranos",
        "rating": 7.5,
        "comment": "",
        "favorite episode": "Long Term Parking",
        "image_url": "https://m.media-amazon.com/images/M/MV5BZGJjYzhjYTYtMDBjYy00OWU1LTg5OTYtNmYwOTZmZjE3ZDdhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
        "genres": [Crime, Drama]
    },
    {
        "title": "Westworld",
        "rating": 8,
        "comment": "The first season gets a 9.5 but season 4 was unwatchable",
        "favorite episode": "The Bicameral Mind",
        "image_url": "https://m.media-amazon.com/images/M/MV5BZDg1OWRiMTktZDdiNy00NTZlLTg2Y2EtNWRiMTcxMGE5YTUxXkEyXkFqcGdeQXVyMTM2MDY0OTYx._V1_.jpg",
        "genres": [SciFi, Drama]
    },
    {
        "title": "Succession",
        "rating": 8.5,
        "comment": "",
        "favorite episode": "This Is Not For Tears",
        "image_url": "https://m.media-amazon.com/images/M/MV5BZDE0ODVlYjktNjJiMC00ODk4LWIwNTktMWRhZmZiOGFhYmUwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
        "genres": [Drama]
    },
    {
        "title": "Severance",
        "rating": 9,
        "comment": "",
        "favorite episode": "The We We Are",
        "image_url": "https://m.media-amazon.com/images/M/MV5BMjkwZjcwMGQtNDAzOC00YjJiLThiYTgtNWU3ZjRiZmY2YzEzXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
        "genres": [Mystery, Drama, SciFi]
    },
    {
        "title": "30 Rock",
        "rating": 9.5,
        "comment": "Best sitcom of all time",
        "favorite episode": "Gavin Volure",
        "image_url": "https://m.media-amazon.com/images/M/MV5BMTQ4NDQ4OTUzOV5BMl5BanBnXkFtZTcwMjMzMTUyNw@@._V1_.jpg",
        "genres": [Comedy]
    },
    {
        "title": "Portlandia",
        "rating": 8.5,
        "comment": "",
        "favorite episode": "One Moore Episode",
        "image_url": "https://m.media-amazon.com/images/M/MV5BOGE2ZTQ3YTEtZTU4NC00NGVlLThjNmUtMGVmYjAzNjdjZmQyL2ltYWdlXkEyXkFqcGdeQXVyMzIyMjcyODI@._V1_.jpg",
        "genres": [Comedy]
    },
    {
        "title": "Parks and Recreation",
        "rating": 7,
        "comment": "",
        "favorite episode": "The Fight",
        "image_url": "https://m.media-amazon.com/images/M/MV5BYWNkOTg0OTMtZTcyNy00MWU1LWJhZDQtYjQzMjU1NjBhYzI2XkEyXkFqcGdeQXVyOTE4NzcwNzI@._V1_.jpg",
        "genres": [Comedy]
    },
    {
        "title": "The Office",
        "rating": 8,
        "comment": "",
        "favorite episode": "Stress Relief",
        "image_url": "https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4ZTktYTc0NzhhNWIzNzJiXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg",
        "genres": [Comedy]
    },
    {
        "title": "Brooklyn Nine-Nine",
        "rating": 7.5,
        "comment": "",
        "favorite episode": "The Jimmy Jab Games",
        "image_url": "https://m.media-amazon.com/images/M/MV5BNzVkYWY4NzYtMWFlZi00YzkwLThhZDItZjcxYTU4ZTMzMDZmXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_.jpg",
        "genres": [Comedy, Crime]
    },
    {
        "title": "New Girl",
        "rating": 6.5,
        "comment": "",
        "favorite episode": "Pepperwood",
        "image_url": "https://m.media-amazon.com/images/M/MV5BMjA0MDc1NTk0Ml5BMl5BanBnXkFtZTgwMTk2ODA5NDM@._V1_.jpg",
        "genres": [Comedy]
    },
    {
        "title": "Community",
        "rating": 8,
        "comment": "",
        "favorite episode": "Advanced Dungeons & Dragons",
        "image_url": "https://m.media-amazon.com/images/M/MV5BNDQ5NDZiYjktZmFmMy00MjAxLTk1MDktOGZjYTY5YTE1ODdmXkEyXkFqcGdeQXVyNjcwMzEzMTU@._V1_.jpg",
        "genres": [Comedy]
    },
    {
        "title": "Seinfeld",
        "rating": 9,
        "comment": "",
        "favorite episode": "The Hamptons",
        "image_url": "https://m.media-amazon.com/images/M/MV5BZjZjMzQ2ZmUtZWEyZC00NWJiLWFjM2UtMzhmYzZmZDcxMzllXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
        "genres": [Comedy]
    },
    {
        "title": "Curb Your Enthusiasm",
        "rating": 9,
        "comment": "",
        "favorite episode": "The Freak Book",
        "image_url": "https://m.media-amazon.com/images/M/MV5BMzE3ZDA4OWItOGY2ZC00MzVmLTk0Y2QtNzEzMjc5YWI5ZWFiXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg",
        "genres": [Comedy]
    },
    {
        "title": "The Simpsons",
        "rating": 9.5,
        "comment": "",
        "favorite episode": "22 Short Films About Springfield",
        "image_url": "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
        "genres": [Comedy, Animated]
    },
    {
        "title": "Broad City",
        "rating": 7,
        "comment": "",
        "favorite episode": "Kockoffs",
        "image_url": "https://m.media-amazon.com/images/M/MV5BNTVjMGFhMmUtMTMwMS00OTE0LTlkODgtMzU0ZDZhY2U1NTliXkEyXkFqcGdeQXVyNjU2ODM5MjU@._V1_.jpg",
        "genres": [Comedy]
    },
    {
        "title": "It's Always Sunny In Philidelphia",
        "rating": 8,
        "comment": "",
        "favorite episode": "Charlie And Dee Find Love",
        "image_url": "https://m.media-amazon.com/images/M/MV5BMzg3ODVjZTYtZTAyNC00MzVjLTk3NmUtMGI4ZjZmNGQ1NmY4XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg",
        "genres": [Comedy]
    },
    {
        "title": "Peep Show",
        "rating": 7,
        "comment": "",
        "favorite episode": "Holiday",
        "image_url": "https://m.media-amazon.com/images/M/MV5BZjYwMWJhOWMtZTc5ZC00MGY0LTg0ZjktMzFhODhhZGZhNDRjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
        "genres": [Comedy]
    },
    {
        "title": "The IT Crowd",
        "rating": 7.5,
        "comment": "",
        "favorite episode": "The Haunting of Bill Crouse",
        "image_url": "https://m.media-amazon.com/images/M/MV5BM2FmMTVmNzktMGY4MS00ODVlLTgxZDktNmMxMjJhODAyOTlmXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
        "genres": [Comedy]
    },
    {
        "title": "Atlanta",
        "rating": 8.5,
        "comment": "",
        "favorite episode": "Teddy Perkins",
        "image_url": "https://m.media-amazon.com/images/M/MV5BZGU1MzRhNmMtNDExOS00NTk2LWJlYzMtMzc4YWYyN2Q3M2ZmXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
        "genres": [Comedy, Drama]
    },
    {
        "title": "Barry",
        "rating": 9,
        "comment": "",
        "favorite episode": "Loud, Fast, And Keep Going",
        "image_url": "https://m.media-amazon.com/images/M/MV5BMzE0MDNiNDMtZTQ4Ni00MmQ4LTk4YzktZjFkYTVmODEzMDc2XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_.jpg",
        "genres": [Comedy, Drama, Crime]
    },
    {
        "title": "Documentary Now",
        "rating": 8,
        "comment": "",
        "favorite episode": "DRONEZ: The Hunt for El Chingon",
        "image_url": "https://m.media-amazon.com/images/M/MV5BMTQ2Mjg3NTA5NV5BMl5BanBnXkFtZTgwNzExNTU1NjE@._V1_.jpg",
        "genres": [Comedy]
    }
]