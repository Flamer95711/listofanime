import React from 'react'
import { useCustom } from '../context/context'
import { Link } from 'react-router-dom'

function Popular() {
  const { popularAnime, isSearch } = useCustom()
  const condition = () => {
    if (!isSearch) {
      {
        return popularAnime.map((anime) => {
          return (
            <Link
              to={`/anime/${anime.mal_id}`}
              key={anime.mal_id}
              className="single_anime"
            >
              <img src={anime.images.jpg.large_image_url} alt="" />
            </Link>
          )
        })
      }
    }
  }

  return (
    <main className="anime_group">
      <div className="anime">{condition()}</div>
    </main>
  )
}
export default Popular
