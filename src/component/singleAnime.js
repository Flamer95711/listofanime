import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

function Anime() {
  const { id } = useParams()
  const [anime, setAnime] = useState({})
  const [character, setCharacter] = useState([])
  const [showMore, setShowMore] = useState(false)

  const {
    title,
    synopsis,
    trailer,
    duration,
    aired,
    season,
    images,
    rank,
    score,
    scored_by,
    popularity,
    status,
    rating,
    source,
  } = anime

  const animeData = async (id) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
    const data = await response.json()
    setAnime(data.data)
    //console.log(anime);
  }
  const characterData = async (id) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${id}/characters`
    )
    const data = await response.json()
    setCharacter(data.data)
    //console.log(data.data)
  }

  //console.log(aired);

  useEffect(() => {
    animeData(id)
    characterData(id)
  }, [])
  return (
    <main key={id} className="anime-container">
      <div className="classy">{title}</div>
      <div className="details">
        <div className="detail">
          <img src={images?.jpg.large_image_url} alt={title} />

          <div className="anime-details">
            <p>
              <span> Aired:</span>
              <span> {aired?.string}</span>
            </p>
            <p>
              <span>Rating:</span>
              <span> {rating}</span>
            </p>
            <p>
              <span>Rank:</span>
              <span> {rank}</span>
            </p>
            <p>
              <span>Score:</span>
              <span> {score}</span>
            </p>
            <p>
              <span>Scored By:</span>
              <span> {scored_by}</span>
            </p>
            <p>
              <span>Popularity:</span>
              <span> {popularity}</span>
            </p>
            <p>
              <span>Status:</span>
              <span> {status}</span>
            </p>
            <p>
              <span>Source:</span>
              <span> {source}</span>
            </p>
            <p>
              <span>Season:</span>
              <span> {season}</span>
            </p>
            <p>
              <span>Duration:</span>
              <span> {duration}</span>
            </p>
          </div>
        </div>
        <p className="description">
          {showMore ? synopsis : synopsis?.slice(0, 400) + '...'}
          <span
            onClick={() => {
              setShowMore(!showMore)
            }}
          >
            {showMore ? ' show less' : ' show more'}
          </span>
        </p>
      </div>

      <div className="title">Trailer</div>
      <div className="trailer-con">
        {trailer?.embed_url ? (
          <iframe
            src={trailer?.embed_url}
            title="Inline Frame Example"
            width="800"
            height="450"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <h3>Trailer not available</h3>
        )}
      </div>
      <div className="title">Characters</div>
      <div className="characters">
        {character.map((item) => {
          const { role } = item
          const { name, images, mal_id } = item.character
          return (
            <Link to={`/character/${mal_id}`} key={mal_id}>
              <div className="character">
                <img src={images?.jpg.image_url} alt={name} />
                <h4>{name}</h4>
                <p>{role}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}

export default Anime
