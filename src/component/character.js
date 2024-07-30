import React, { useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router'

const Character = () => {
  const { id } = useParams()
  //const [loading,setLoading]=useState(true)
  const reducer = (state, action) => {
    switch (action.type) {
      case 'LOADING':
        return { ...state, loading: true }
      case 'DATA':
        return {
          ...state,
          images: action.payload.images.jpg.image_url,
          anime: action.payload.anime,
          about: action.payload.about,
          manga: action.payload.manga,
          name: action.payload.name,
          loading: false,
        }
      default:
        return { ...state }
    }
  }
  const initialState = {
    images: '',
    anime: [],
    about: '',
    manga: [],
    name: '',
    loading: true,
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const getCharacter = async (id) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/characters/${id}/full`
    )
    const data = await response.json()
    //console.log(data.data)
    dispatch({ type: 'DATA', payload: data.data })
  }
  //console.log(state)

  useEffect(() => {
    dispatch({ type: 'LOADING' })
    getCharacter(id)
  }, [])
  return (
    <div className="ch-body">
      <h1>{state.name}</h1>
      <img src={state.images} alt={state.name} />
      <div className="ch-section">
        <p>{state.about}</p>
        <div className="ch-details">
          <ul>
            <h2>anime</h2>
            {state.anime.map((item) => {
              return (
                <li>
                  <a href={item.anime.url}>{item.anime.title} </a>
                </li>
              )
            })}
          </ul>

          <ul>
            <h2>manga</h2>
            {state.manga.map((item) => {
              return (
                <li>
                  <a href={item.manga.url}>{item.manga.title} </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Character
