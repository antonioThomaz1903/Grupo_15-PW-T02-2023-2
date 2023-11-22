"use client";
import Sidebar from "../game/Sidebar";
import { useState, useEffect } from "react";
import getFromAPI from "../game/getFromAPI";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import {
  addImagem,
  getImagens,
  getImagensByClickCount,
  incrementCliquesByUrl,
} from "./rankingFunctions";

export default function Page() {
  const [imageURLs, setImageURLs] = useState([]);

  const [categoriaEscolhida, setCategoriaEscolhida] = useState("");

  const [ranking, setRanking] = useState([]);

  useState(() => {
    const cookies = parseCookies();
    const categoriaInicial = cookies.categoriaEscolhida;
    console.log(categoriaEscolhida);
    if (categoriaInicial) {
      setCategoriaEscolhida(categoriaInicial); // Obtém a categoria do cookie
      console.log(categoriaEscolhida);
    }
  });

  useEffect(() => {
    async function fetchData() {
      setRanking(await getImagensByClickCount(categoriaEscolhida));
    }
    fetchData();
  }, []);
  const top3Images = ranking.slice(0, 3);
  const otherImages = ranking.slice(3);
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
          <div className="mb-16 mr-8 lg:mr-32 text-center flex flex-column items-center justify-center">
            <h2>2° lugar</h2>
            <img
              src={top3Images[1]?.url}
              className="w-20 h-20 xl:w-80 xl:h-80 lg:w-60 lg:h-60 md:w-40 md:h-40"
            />
            <p>{top3Images[1]?.cliques}</p>
          </div>

          <div className="mb-32 mr-8 lg:mr-32 text-center flex flex-column items-center justify-center">
            <h2>1° lugar</h2>
            {top3Images ? (
              <>
                <img
                  className="w-20 h-20 xl:w-80 xl:h-80 lg:w-60 lg:h-60 md:w-40 md:h-40"
                  src={top3Images[0]?.url}
                  alt="Imagem 1"
                />
                <p>{top3Images[0]?.cliques}</p>
              </>
            ) : (
              <p>Nenhuma imagem disponível</p>
            )}
          </div>

          <div className="mb-0 text-center flex flex-column items-center justify-center">
            <h2>3° lugar</h2>
            <img
              src={top3Images[2]?.url}
              className="w-20 h-20 xl:w-80 xl:h-80 lg:w-60 lg:h-60 md:w-40 md:h-40"
            />
            <p>{top3Images[2]?.cliques}</p>
          </div>
        </div>

        <h2>Outras Imagens</h2>
        <ul>
          {otherImages.map((image, index) => (
            <li className="flex flex-row items-center" key={image.id}>
              <h2>{index + 4}°</h2>
              <img
                src={image.url}
                className="w-14 h-14 m-4 sm:w-28 sm:h-28"
              ></img>
              <p>{image.cliques}</p>
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
}
