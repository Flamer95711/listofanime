import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react'
import { action } from './action'
import reducer from './reducer'
const { searched, upcomingAnime, airingAnime, popularAnime, loading } = action
const GlobalContext = createContext()
const baseUrl = 'https://api.jikan.moe/v4'
export const AppProvider = ({ children }) => {
  const initialState = {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    searchResults: [],
    picture: [],
    loading: false,
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const [search, setSearch] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [result, setResult] = useState('')

  const getPopularAnime = async () => {
    dispatch({ type: loading })
    const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`)
    const data = await response.json()
    dispatch({ type: popularAnime, payload: data.data })
    // console.log(isSearch);
  }
  const getSearchAnime = async () => {
    dispatch({ type: loading })
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${search}&order_by=popularity&sort=asc&sfw`
    )
    const data = await response.json()
    //console.log(isSearch);
    dispatch({ type: searched, payload: data.data })
  }

  const getUpcomingAnime = async () => {
    const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`)
    const data = await response.json()
    dispatch({ type: upcomingAnime, payload: data.data })
    //console.log(data.data)
  }

  const getAiringAnime = async () => {
    const response = await fetch(`${baseUrl}/top/anime?filter=airing`)
    const data = await response.json()
    dispatch({ type: airingAnime, payload: data.data })
    //console.log(data.data)
  }

  useEffect(() => {
    if (isSearch) {
      getSearchAnime()
    } else {
      getPopularAnime()
    }

    //console.log(search);
  }, [loading, search])

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        setSearch,
        setIsSearch,
        isSearch,
        search,
        getAiringAnime,
        getPopularAnime,
        getUpcomingAnime,
        result,
        setResult
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useCustom = () => {
  return useContext(GlobalContext)
}
