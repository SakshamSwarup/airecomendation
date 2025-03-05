import React from 'react'

function Search({search, set_search}) {
    return (
        <div className="search">
            <div>
                <label htmlFor="search-input">
                    <img src= "src/assets/search.png" className="mt-2" alt = "Search" />
                    <input className="form-control " value={search} onChange={(e)=>set_search(e.target.value)} type="text" placeholder="Search" />
                </label>
            </div>
        </div>
    )
}

export default Search
