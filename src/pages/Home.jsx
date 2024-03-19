import React, { useEffect, useState } from "react";
import { catOptions } from "../options";
import { apiKey } from "../env";
import axios from "axios";

export const Home = () => {
  const [catData, setCatData] = useState(null);
  const [catFacts, setCatFacts] = useState(null);

  const [loading, setLoading] = useState(false);
  const fetchData = () => {
    setLoading(true);
    axios
      .get(
        "https://api.thecatapi.com/v1/images/search?format=json&limit=10",
        catOptions
      )
      .then((response) => { setCatData(response.data); setLoading(false); })
      .catch((error) => console.error("error during fetching"));
  };

  const catFact = () => {
    fetch('https://cat-fact.herokuapp.com/facts/random')
      .then(response => response.json())
      .then(data => setCatFacts(data.text))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnClick = (e) => {
    e.preventDefault();
    fetchData();
    catFact();
  };

  const onClickAdd = async (event, catId) => {
    event.preventDefault();

    const catAddFavoriteOptions = {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    };
    var data = {
      image_id: catId,
      sub_id: "my-user-1",
    };

    axios
      .post(
        "https://api.thecatapi.com/v1/favourites",
        data,
        catAddFavoriteOptions
      )
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="main-container">
      <div className="image-grid">
        {catData?.slice(0, 4).map((cat) => (
          <div className="image-button-pair">
            <img className="grid-image" src={cat.url} />
            <button
              className="grid-button"
              onClick={(event) => onClickAdd(event, cat.id)}
            >
              <span class="material-symbols-outlined ">favorite</span>
            </button>
          </div>
        ))}
      </div>

      <div className="main-container-description">
        <h2 className="main-container-title">Cat Image Generator</h2>
        <div className="main-container-text">
          Cat paradise is where you can click on the button below to get random
          images of cats. Click on the "❤️" button to add them to your
          favorites.
        </div>
        {loading == false ? <button className="main-container-button" onClick={handleOnClick}>
          Randomize
        </button> : <p>Loading</p>}
        <div className="Facts-container">
          {catFacts && <p>{catFacts}</p>}
        </div>
      </div>

    </section>
  );
};