import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CatGrid from "./components/CatGrid";
import "./components/css/main.css";

const App = () => {
  const [activePage, setActivePage] = useState("all"); // Состояние страницы
  const [allCats, setAllCats] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  // Загружаем котиков
  useEffect(() => {
    if (activePage === "all" && allCats.length === 0) {
      fetchCats();
    }
  }, [activePage]);

  const fetchCats = async () => {
    try {
      const response = await fetch(
        "https://api.unsplash.com/photos/random?query=cat&count=15&client_id=I-J4hxjst_Uyuag0dm_9cHXIH6ogMZaSLSzpHYQSkhI"
      );
      const data = await response.json();

      const catImages = data.map((cat) => ({
        id: cat.id,
        url: cat.urls.small,
      }));

      // Добавляем только уникальные фотографии
      setAllCats((prev) => {
        const uniqueCats = catImages.filter(
          (newCat) => !prev.some((existingCat) => existingCat.id === newCat.id)
        );
        return [...prev, ...uniqueCats];
      });
    } catch (error) {
      console.error("Ошибка при загрузке котиков:", error);
    }
  };

  // Добавление/удаление в избранное
  const toggleFavorite = (cat) => {
    const isFavorite = favorites.some((fav) => fav.id === cat.id);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== cat.id)
      : [...favorites, { ...cat }]; // Клонируем объект 

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="app">
      <Header activePage={activePage} setActivePage={setActivePage} />
      {activePage === "all" ? (
        <CatGrid
          cats={allCats}
          onLoadMore={fetchCats}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
        />
      ) : (
        <CatGrid
          cats={favorites}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
        />
      )}
    </div>
  );
};

export default App;