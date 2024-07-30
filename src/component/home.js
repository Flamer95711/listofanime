import React, { useEffect, useRef, useState } from 'react'
import Popular from './popular'
import { useCustom } from '../context/context'
import SearchAnime from './searchAnime'
import Airing from './airing'
import Upcoming from './upcoming'

export default function Home() {
  const {
    setSearch,
    setIsSearch,
    isSearch,
    search,
    getPopularAnime,
    getAiringAnime,
    getUpcomingAnime,
    result,
    setResult
  } = useCustom()
  const searchValue = useRef('')
  const [render, setRender] = useState('popular')
  
  const switchComponent = () => {
    switch (render) {
      case 'popular':
        setSearch('')
       // setResult('')
        setIsSearch(false)
        return <Popular rendered={render} />
      case 'airing':
        setSearch('')
       // setResult('')
        setIsSearch(false)
        return <Airing rendered={render} />
      case 'upcoming':
        setSearch('')
        //setResult('')
        setIsSearch(false)
        return <Upcoming rendered={render} />
      default:
        return <Popular rendered={render} />
    }
  }
  const handelSearch = () => {
    console.log(result)
  
    if (searchValue.current.value) {
      setSearch(searchValue.current.value)

      // Use set isSearch method to update the value
      setIsSearch(true)
      // setResult(true)
    } else {
      // Use set isSearch method to update the value
      setSearch('')
      setIsSearch(false)
      //setResult(false)
    }
  }
  useEffect(()=>{
    //console.log("here is your result",{result});
  },[])
  const handelSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className="main">
      <header>
        <div className="logo">
          <h1>
            {render === 'popular'
              ? 'popular anime'
              : render === 'airing'
              ? 'airing anime'
              : render === 'upcoming'
              ? 'upcoming anime'
              : 'none of the above action is found'}
          </h1>
        </div>
        <div className="search-container">
          <div className="filter-btn popular-filer">
            <button
              onClick={() => {
                setRender('popular')
                setIsSearch(false)
              }}
              className="btn"
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/fire-element--v1.png"
                alt="fire-element--v1"
              />
              popular
            </button>
          </div>
          <form action="" className="search-form" onSubmit={handelSubmit}>
            <div className="input-control">
              <input
                type="text"
                ref={searchValue}
                placeholder="search anime"
                value={result}
                onChange={() => setResult(searchValue.current.value)}
              />
              <button onClick={() => handelSearch()}>search</button>
            </div>
          </form>
          <div className="filter-btn airing-filter">
            <button
              onClick={() => {
                setRender('airing')
                setIsSearch(false)
                getAiringAnime()
              }}
              className="btn"
            >
              Airing
            </button>
          </div>
          <div className="filter-btn upcoming-filer">
            <button
              onClick={() => {
                setRender('upcoming')
                getUpcomingAnime()
              }}
              className="btn"
            >
              Upcoming
            </button>
          </div>
        </div>
      </header>
      <div> {isSearch ? <SearchAnime /> : switchComponent()}</div>
    </div>
  )
}
