import React, { useEffect, useState } from "react";
import "./css/main.css";

const CatGrid = ({ cats, onLoadMore, toggleFavorite, favorites }) => {
  //страница с бесконечной прокруткой, чтобы не было дубликатов
  // сначала отслеживаем загружаем ли мы котиков
  const [loading, setLoading] = useState(false);

  // проверяем виден ли элемент на экране
  const isElementInView = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  };

  useEffect(() => {
    // Обработчик прокрутки
    const handleScroll = () => {
      const loadMoreButton = document.querySelector(".load-button");

      // если видим кнопку на экране - котики не загружаются
      if (loadMoreButton && isElementInView(loadMoreButton) && !loading) {
        setLoading(true); // Помечаем, что загружаются
        onLoadMore(); // Загружаем больше котиков
      }
    };

    // Добавляем обработчик события прокрутки
    window.addEventListener("scroll", handleScroll);

    // убираем обработчик при удалении узла/размонтировании компонента
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onLoadMore, loading]); // хук будет работать каждый раз, когда состояние onLoadMore или loading

  useEffect(() => {
    // после завершения подгрузки фоток сбрасываем флаг loading
    if (loading) {
      setLoading(false);
    }
  }, [cats]); // флаг сбрасывается, когда массив с фотками обновляется

  return (
    <div>
      <div className="cat-grid">
        {cats.map((cat) => (
          <div
            className="cat-item"
            key={cat.id}
            style={{
              backgroundImage: `url(${cat.url})`,
            }}
          >
            <button

              className={`heart-icon ${favorites.some((fav) => fav.id === cat.id) ? "active" : ""
                }`}
              onClick={() => toggleFavorite(cat)}
            >
              <svg width="40" height="37" viewBox="-2 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 36.7L17.1 34.06C6.8 24.72 0 18.56 0 11C0 4.84 4.84 0 11 0C14.48 0 17.82 1.62 20 4.18C22.18 1.62 25.52 0 29 0C35.16 0 40 4.84 40 11C40 18.56 33.2 24.72 22.9 34.08L20 36.7Z" stroke="#F24E1E" strokeWidth="4" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      {onLoadMore && (
        <div className="load">
          <button className="load-button" onClick={onLoadMore}>
            ... загружаем ещё котиков ...
          </button>
        </div>
      )}
    </div>
  );
};

export default CatGrid;