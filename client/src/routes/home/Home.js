import React from 'react'
import DeskPost from '../../components/desk-posts/DeskPost'
import './home.css'
const Home = () => {
  return (
    <div id="home">
      <div className="search-bar__container p2">
        <div className="search-bar__header">
          <div className="wrapper">
            <h1>Hide your</h1>
            <div className="words">
              <h1>
                <span>wires</span>
              </h1>
              <h1>
                <span>trash</span>
              </h1>
              <h1>
                <span>wires</span>
              </h1>
            </div>
            <h1>.</h1>
          </div>
          <h1>
            <span>Share your setup</span>.
          </h1>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search by tags" />
        </div>
        <div className="search-tags">
          <button>minimal</button>
          <button>gaming</button>
          <button>productivity</button>
          <button>aesthetic</button>
        </div>
      </div>

      {/* What is this site? */}
      <div className="instructions__container p2">
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
        <img
          src="https://www.minimaldesksetups.com/wp-content/uploads/2020/09/Featureimage.jpg"
          alt=""
        />
      </div>
      <DeskPost />
    </div>
  )
}

export default Home
