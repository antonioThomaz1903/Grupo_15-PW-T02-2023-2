"use client";
import Sidebar from "../game/Sidebar";
import { useState, useEffect } from "react";
import getFromAPI from "../game/getFromAPI";
import { useRouter } from "next/navigation";

const images = [
  {
    id: 1,
    name: "Imagem 1",
  },
  {
    id: 2,
    name: "Imagem 2",
  },
  {
    id: 3,
    name: "Imagem 3",
  },
  {
    id: 4,
    name: "Imagem 4",
  },
  {
    id: 5,
    name: "Imagem 5",
  },
  {
    id: 6,
    name: "Imagem 6",
  },
  {
    id: 7,
    name: "Imagem 7",
  },
  {
    id: 8,
    name: "Imagem 8",
  },
  {
    id: 9,
    name: "Imagem 9",
  },
  {
    id: 10,
    name: "Imagem 10",
  },
];

const Top10 = () => {
  const [imageURLs, setImageURLs] = useState([]);
  const fetchImageURLs = async () => {
    try {
      const endpoints = ["search","search","search","search","search","search","search","search","search", "search"]; // Substitua com os endpoints desejados
      const urls = [];
      let a = 0;

      for (const endpoint of endpoints) {
        const url = await getFromAPI(endpoint);

        console.log(a++);
        if (url) {
          urls.push(url);
        }
      }

      setImageURLs(urls);
    } catch (error) {
      console.error("Erro ao buscar URLs das imagens:", error);
    }
  };
  useEffect(() => {
    fetchImageURLs();
  }, []);
  const top3Images = images.slice(0, 3);
  const otherImages = images.slice(3);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="fixed z-50 p-4 text-white cursor-pointer"
      >
        {isSidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
      <h1 className="text-white text-center m-8">Top 10</h1>
      <div className="w-full flex flex-column items-center justify-center text-white">
        <div className="flex flex-row items-center">
          <div key={images[1].id} className="mb-16 mr-8 lg:mr-32 text-center flex flex-column items-center justify-center">
            <h2>2° lugar</h2>
            <img className="w-20 h-20 xl:w-80 xl:h-80 lg:w-60 lg:h-60 md:w-40 md:h-40" src={imageURLs[1]} alt={images[1].name} />
            <p>Ciclano</p>
          </div>

          <div key={images[0].id} className="mb-32 mr-8 lg:mr-32 text-center flex flex-column items-center justify-center">
            <h2>1° lugar</h2>
            <img className="w-20 h-20 xl:w-80 xl:h-80 lg:w-60 lg:h-60 md:w-40 md:h-40" src={imageURLs[0]} alt={images[0].name} />
            <p>Fulano</p>
          </div>

          <div key={images[2].id} className="mb-0 text-center flex flex-column items-center justify-center">
            <h2>3° lugar</h2>
            <img className="w-20 h-20 xl:w-80 xl:h-80 lg:w-60 lg:h-60 md:w-40 md:h-40" src={imageURLs[2]} alt={images[2].name} />
            <p>Beltrano</p>
          </div>
        </div>

        <h2>Outras Imagens</h2>
        <ul>
          {otherImages.map((image) => (
            <li className="flex flex-row items-center" key={image.id}>
              <h2>{image.id}°</h2>
              <img
                className="w-14 h-14 m-4 sm:w-28 sm:h-28"
                src={imageURLs[image.id-1]}
                alt={image.name}
              ></img>
              <p>{image.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
      <div
        className={`fixed h-full top-0 left-0 bg-black opacity-25 z-40 transition-opacity ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
};

export default Top10;
