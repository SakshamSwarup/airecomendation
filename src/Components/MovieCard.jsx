import React from 'react'

function MovieCard({movie:{title, poster_path, vote_average , release_date ,original_language}}) {
    return (
        <div className="movie-card">
            <img  src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : `src/assets/Noposter.png` }/>
            <h3 className="mt-4 text-white text-xl">{title}</h3>
            <div className="content">
            <div className="rating">
                <img src= "/src/assets/Vector.png" />
            <p className=".rating p">{vote_average ? vote_average.toFixed(1):`NaN` }</p>
                <span>•</span>
                <p className="lang text-sm">{original_language}</p>
                <span>•</span>
                <p className="text-neutral-500 text-sm">{release_date ? release_date.split("-")[0] : 'NaN'}</p>
            </div>
            </div>

        </div>
    )
}

export default MovieCard
