import React from 'react'
import DeskPost from '../../components/desk-posts/DeskPost'

const Home = () => {
  return (
    <div>
      <div className="search-bar__container">
        {/* <img
          src="https://www.minimaldesksetups.com/wp-content/uploads/2020/09/Featureimage.jpg"
          alt=""
        /> */}
        <div className="search-bar__header">
          <h1>Clean your mat.</h1>
          <h1>Hide your wires.</h1>
          <h1>Share your setup.</h1>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search by tags" />
        </div>
      </div>

      {/* What is this site? */}
      <div className="instructions__container">
        <div className="instructions__info">
          <h1>Explore and rate setups</h1>
          <div className="instructions__section">
            <div>
              <h2>Get an idea</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
                repudiandae harum vero consequuntur! Deserunt maiores dolore
              </p>
            </div>
            <div>
              <h2>Your thoughts?</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
                repudiandae harum vero consequuntur! Deserunt maiores dolore
              </p>
            </div>
          </div>
        </div>
        <div className="instructions__img">
          {/* <img src="" alt="" /> */}
          <h1>img</h1>
        </div>
      </div>
      <DeskPost />
    </div>
  )
}

export default Home
