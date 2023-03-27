import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "./home.css";
import categories from "../Categories.json";
import  {useLocation} from "react-router"

const Home = () => {
  const location = useLocation();
  const [films, setfilms] = useState(JSON.parse(localStorage.getItem("films")));
  const [listCategory, setlistCategory] = useState(categories);
  const [searchTerm, setsearchTerm] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchParam = searchParams.get("search");
    if (searchParam != null) {
      const newFilms = JSON.parse(localStorage.getItem("films")).filter(
        (film) => film.name.toLowerCase().includes(searchParam.toLowerCase())
      );
      setfilms(newFilms);
    }
  }, [location.search]);
  

  const handleClickCategory = (category) => {
    const newFilms = JSON.parse(localStorage.getItem("films")).filter(
      (film) => film.category === category
    );
    setfilms(newFilms);
  };

  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="home_wrap"> 
          <div className="albums_category">
            <div className="albums_title">
              <h2>CATEGORY:</h2>
              <ul> 
                {listCategory.map((category, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      onClick={() => handleClickCategory(category.category)}
                    >
                      {category.category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="album_items_container">
            <div className="albums_items">
              {films.map((film, index) => (
                <div
                  className="albums_items_wrap"
                  style={{ border: "1px solid #ccc", marginRight: "30px" }}
                  key={index}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                      alt: `Picture #${index}`,
                    }}
                    src={film.imageUrl}
                  />
                  <div className="album_des">
                    <h5>Name: {film.name}</h5>
        
                  </div>
                  <div className="album_des">
                    <h5>Type: {film.category}</h5>
                    
                  </div>
                  <div className="album_des">
                    <h5>Score: {film.score}</h5>
                    
                  </div>
                  <button className="album_but">Comment</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
