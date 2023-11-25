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
  const router = useRouter();

  const [imageURLs, setImageURLs] = useState([]);

  const [categoriaEscolhida, setCategoriaEscolhida] = useState("");

  const [ranking, setRanking] = useState([]);

  const [exibir, setExibir] = useState(false);

  const handleEscolhaCategoria = (categoria) => {
    // Crie um cookie para armazenar a categoria escolhida
    setCookie(null, "categoriaEscolhida", categoria, {
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    }); // O cookie expirará em 7 dias (ajuste conforme necessário)
    router.push("/game");
  };

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

      <nav
          className={`fixed h-full gradient-border-menu top-0 left-0 bg-black rounded-top-right-lg text-white transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } w-64 z-50`}
        >
          <div class="flex flex-col rounded-lg items-center w-full h-full overflow-hidden text-white bg-gray-800 rounded">
            <div className="flex flex-row w-full justify-between border-b-2 border-white">
              <h1 className="text-2xl pt-8 pl-4 font-bold">Categorias</h1>
              <button
                onClick={toggleSidebar}
                className="text-white self-start p-2 text-xl font-bold"
              >
                X
              </button>
            </div>
            <ul className="h-full w-full pt-4 pl-0">
              <li className="mb-2">
                <button
                  className="flex items-center pt-3 text-2xl text-gray-200 hover:text-white pl-8 w-full h-12 mt-2 rounded hover:bg-gray-700 hover:text-white"
                  onClick={() => {
                    handleEscolhaCategoria("aleatorio");
                  }}
                >
                  <p
                    
                  >
                    Aleatório
                  </p>
                </button>
              </li>
              <li
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                className="mb-2"
              >
                <div className="w-full items-center flex">
                  <button
                   className="flex pt-3 items-center pl-8 text-2xl w-full h-12 mt-2 rounded hover:bg-gray-700 hover:text-white"
                    onClick={() =>
                      exibir ? setExibir(false) : setExibir(true)
                    }
                  >
                    <p
                      
                    >
                      Animais
                    </p>

                  </button>
                </div>
                {exibir ? (
                  <>
                    <ul>
                      <li>
                        <button
                           className="flex bg-gray-700 items-center ml-8 p-2 w-full h-12 mt-2 rounded hover:bg-gray-600 hover:text-white"
                          onClick={() => {
                            handleEscolhaCategoria("cachorro");
                          }}
                        >
                          <h1
                            style={{ fontSize: "20px" }}
                          >
                            Cachorro
                          </h1>
                        </button>
                      </li>
                      <li>
                        <button
                           className="flex items-center bg-gray-700 ml-8 p-2 w-full h-12 p2 hover:bg-gray-600 hover:text-white"
                          onClick={() => {
                            handleEscolhaCategoria("gato");
                          }}
                        >
                          <h1
                           style={{ fontSize: "20px" }}
                          >
                            Gato
                          </h1>
                        </button>
                      </li>
                      <li>
                        <button
                           className="flex items-center bg-gray-700 ml-8 p-2 w-full h-12 hover:bg-gray-600 hover:text-white"onClick={() => {
                            handleEscolhaCategoria("raposa");
                          }}
                        >
                          <h1
                            style={{ fontSize: "20px" }}
                          >
                            Raposas
                          </h1>
                        </button>
                      </li>
                      <li>
                        <button
                           className="flex items-center bg-gray-700 ml-8 p-2 w-full h-12 hover:bg-gray-600 hover:text-white"onClick={() => {
                            handleEscolhaCategoria("sapo");
                          }}
                        >
                          <h1
                            style={{ fontSize: "20px" }}
                          >
                            Sapos
                          </h1>
                        </button>
                      </li>
                    </ul>
                  </>
                ) : null}
              </li>
              <li className="mb-2">
                <button
                   className="flex pt-3 items-center text-2xl pl-8 w-full h-12 mt-2 hover:bg-gray-700 hover:text-white"onClick={() => {
                    handleEscolhaCategoria("museu");
                  }}
                >
                  <p
                    
                  >
                    Museu
                  </p>
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <div
          className={`fixed h-full top-0 left-0 bg-black opacity-25 z-40 transition-opacity ${
            isSidebarOpen ? "block" : "hidden"
          }`}
          onClick={toggleSidebar}
        ></div>
    </div>
  );
}
