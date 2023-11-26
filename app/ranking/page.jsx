"use client";
import { useState, useEffect } from "react";
import getFromAPI from "../game/getFromAPI";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  addImagem,
  getImagens,
  getImagensByClickCount,
  incrementCliquesByUrl,
} from "./rankingFunctions";
import { logout } from "../logout";

export default function Page() {
  const router = useRouter();

  const [imageURLs, setImageURLs] = useState([]);

  const [categoriaEscolhida, setCategoriaEscolhida] = useState("");

  const [ranking, setRanking] = useState([]);

  const [exibir, setExibir] = useState(false);

  const [logado, setLogado] = useState(true);

  const handleEscolhaCategoria = (categoria) => {
    setCookie(null, "categoriaEscolhida", categoria, {
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    router.push("/game");
  };

  useState(() => {
    const cookies = parseCookies();
    const categoriaInicial = cookies.categoriaEscolhida;
    const usuario = cookies.usuario;
    console.log(categoriaEscolhida);
    if (categoriaInicial) {
      setCategoriaEscolhida(categoriaInicial);
      console.log(categoriaEscolhida);
    }

    if(!usuario) setLogado(false);
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

  if (logado) {
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
          className={`fixed h-full top-0 left-0 bg-black  text-white transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } w-64 z-50`}
        >
          <div class="flex  gradient-border-menu flex-col items-center w-full h-full overflow-hidden text-white border-r-4">
            <div className="flex flex-row w-full justify-between border-b-2 border-white">
              <h1 className="text-2xl pt-8 pl-4 font-bold">Categorias</h1>
              <button
                onClick={toggleSidebar}
                className="text-white self-start p-2 text-xl font-bold"
              >
                X
              </button>
            </div>
            <ul className="h-full w-full pt-4 pl-0 left-0">
              <li className="mb-2">
                <button
                  className="flex items-center pt-3 text-2xl text-white pl-8 w-full h-12 mt-2  hover:bg-[#19284a]  hover:text-white"
                  onClick={() => {
                    handleEscolhaCategoria("aleatorio");
                  }}
                >
                  <p>Aleatório</p>
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
                    className="flex pt-3 items-center pl-8 text-2xl w-full h-12 mt-2  hover:bg-[#19284a] hover:text-white"
                    onClick={() =>
                      exibir ? setExibir(false) : setExibir(true)
                    }
                  >
                    {!exibir ? (
                      <svg
                        className="mb-3 mr-2"
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 12H15"
                          stroke="#ffffff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 9L12 15"
                          stroke="#ffffff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
                          stroke="#ffffff"
                          stroke-width="2"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="mb-3 mr-2"
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                          stroke="#ffffff"
                          stroke-width="1.5"
                        />
                        <path
                          d="M15 12H9"
                          stroke="#ffffff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    )}
                    <p>{`Animais`}</p>
                  </button>
                </div>
                {exibir ? (
                  <>
                    <ul className="w-full pl-0">
                      <li>
                        <button
                          className="flex border-t-4 items-center pl-16 w-full h-12 mt-2 bg-slate-800 hover:bg-[#122c66] hover:text-white"
                          onClick={() => {
                            handleEscolhaCategoria("cachorro");
                          }}
                        >
                          <h1 style={{ fontSize: "20px" }}>Cachorro</h1>
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex  items-center pl-16 w-full h-12 bg-slate-800 hover:bg-[#122c66] hover:text-white"
                          onClick={() => {
                            handleEscolhaCategoria("gato");
                          }}
                        >
                          <h1 style={{ fontSize: "20px" }}>Gato</h1>
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex  items-center pl-16 w-full h-12 bg-slate-800 hover:bg-[#122c66] hover:text-white"
                          onClick={() => {
                            handleEscolhaCategoria("raposa");
                          }}
                        >
                          <h1 style={{ fontSize: "20px" }}>Raposas</h1>
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex border-b-4 items-center pl-16 w-full h-12 bg-slate-800 hover:bg-[#122c66] hover:text-white"
                          onClick={() => {
                            handleEscolhaCategoria("sapo");
                          }}
                        >
                          <h1 style={{ fontSize: "20px" }}>Sapos</h1>
                        </button>
                      </li>
                    </ul>
                  </>
                ) : null}
              </li>
              <li className="mb-2">
                <button
                  className="flex pt-3 items-center text-2xl pl-8 w-full h-12 mt-2 hover:bg-[#19284a] hover:text-white"
                  onClick={() => {
                    handleEscolhaCategoria("anime");
                  }}
                >
                  <p>Animes</p>
                </button>
              </li>
              <li className="mb-2">
                <button
                  className="flex pt-3 items-center text-2xl pl-8 w-full h-12 mt-2 hover:bg-[#19284a] hover:text-white"
                  onClick={() => {
                    handleEscolhaCategoria("comida");
                  }}
                >
                  <p>Comidas</p>
                </button>
              </li>
              <li className="mb-2">
                <button
                  className="flex pt-3 items-center text-2xl pl-8 w-full h-12 mt-2 hover:bg-[#19284a] hover:text-white"
                  onClick={() => {
                    handleEscolhaCategoria("museu");
                  }}
                >
                  <p>Museu</p>
                </button>
              </li>
              <li className="mb-2">
                <button
                  className="flex pt-3 items-center text-2xl pl-8 w-full h-12 mt-2 hover:bg-[#19284a] hover:text-white"
                  onClick={() => {
                    handleEscolhaCategoria("pokemon");
                  }}
                >
                  <p>Pokémon</p>
                </button>
              </li>
              <li className="mb-2">
                <button
                  className="flex pt-3 items-center text-2xl pl-8 w-full h-12 mt-2 hover:bg-[#19284a] hover:text-white"
                  onClick={() => {
                    handleEscolhaCategoria("rick");
                  }}
                >
                  <p>Rick and Morty</p>
                </button>
              </li>
            </ul>
            <button
              className="flex items-center justify-center pt-3 text-2xl text-white w-full h-12 mt-2 hover:bg-[#19284a]  hover:text-white"
              onClick={() => {
                logout();
                destroyCookie(undefined, "usuario");
                router.push("/");
              }}
            >
              <p>LogOut</p>
            </button>
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
  } else {
    router.push("/");
  }

  return null;
}
