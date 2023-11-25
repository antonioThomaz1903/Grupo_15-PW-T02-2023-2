"use client";

import Foto from "./foto";
import Image from "next/image";
import { useState, useEffect } from "react";
import museuIds from "./museuIds";
import axios from "axios";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import {
  addImagem,
  getImagemByUrl,
  incrementCliquesByUrl,
} from "../ranking/rankingFunctions";
import { getAuth, signOut } from "firebase/auth";
import { logout } from "../logout";

export default function Page() {
  const auth = getAuth();

  const [user, setUser] = useState(auth.currentUser);

  const router = useRouter();

  const [exibir, setExibir] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [clicou, setClicou] = useState(false);

  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");

  const [titulo, settitulo] = useState("");

  const [categoriaEscolhida, setCategoriaEscolhida] = useState("");

  const [porcentagem, setPorcentagem] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const urls = [
    ["cachorro", "https://dog.ceo/api/breeds/image/random", "message"],
    ["gato", "https://api.thecatapi.com/v1/images/search", "url"],
    ["raposa", "https://randomfox.ca/floof/", "image"],
    [
      "sapo",
      "http://allaboutfrogs.org/funstuff/random/",
      "+ algum numero de 1 - 54 com 4 digitos . jpg",
    ],
    [
      "museu",
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/",
      "algum número de 0 - 904997 enquanto primaryImage !=  string vazia",
    ],
  ];

  // Função para lidar com a escolha da categoria
  const handleEscolhaCategoria = (categoria) => {
    // Crie um cookie para armazenar a categoria escolhida
    setCookie(null, "categoriaEscolhida", categoria, {
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    }); // O cookie expirará em 7 dias (ajuste conforme necessário)
    window.location.reload();
  };

  useEffect(() => {
    const cookies = parseCookies();
    const categoriaInicial = cookies.categoriaEscolhida; // Obtém a categoria do cookie
    if (categoriaInicial) {
      setCategoriaEscolhida(categoriaInicial); // Obtém a categoria do cookie
      console.log(categoriaEscolhida);
    }

    var u_ere_eles = [];

    const fetchData = async () => {
      //////////////////////////////////
      if (categoriaInicial == "cachorro" && url1 === "") {
        settitulo("Cachorros");
        setIsLoading(true);

        await axios
          .get("https://dog.ceo/api/breeds/image/random")
          .then((response) => {
            console.log("Dados da API:", response);
            u_ere_eles.push(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });

        await axios
          .get("https://dog.ceo/api/breeds/image/random")
          .then((response) => {
            console.log("Dados da API:", response);
            u_ere_eles.push(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      //////////////////////////////////
      if (categoriaInicial == "gato" && url1 === "") {
        settitulo("Gatos");
        setIsLoading(true);

        try {
          const response = await fetch(
            "https://api.thecatapi.com/v1/images/search"
          );
          if (!response.ok) {
            throw new Error("Erro na requisição");
          }

          const data = await response.json();
          if (data.length > 0 && data[0].url) {
            u_ere_eles.push(data[0].url);
          } else {
            throw new Error("Nenhuma URL encontrada na resposta");
          }
        } catch (error) {
          console.error("Erro na requisição:", error);
          return null;
        }
        try {
          const response = await fetch(
            "https://api.thecatapi.com/v1/images/search"
          );
          if (!response.ok) {
            throw new Error("Erro na requisição");
          }

          const data = await response.json();
          if (data.length > 0 && data[0].url) {
            u_ere_eles.push(data[0].url);
          } else {
            throw new Error("Nenhuma URL encontrada na resposta");
          }
        } catch (error) {
          console.error("Erro na requisição:", error);
          return null;
        }
      }

      //////////////////////////////////
      if (categoriaInicial === "aleatorio" && url1 === "") {
        settitulo("Aleatório");
        setIsLoading(true);

        await axios
          .get("https://picsum.photos/600/500")
          .then((response) => {
            console.log("Dados da API (Imagem 1):", response);
            u_ere_eles.push(response.request.responseURL);
          })
          .catch((error) => {
            console.log(error);
          });

        await axios
          .get("https://picsum.photos/600/500")
          .then((response) => {
            console.log("Dados da API (Imagem 2):", response);
            u_ere_eles.push(response.request.responseURL);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      //////////////////////////////////
      if (categoriaInicial == "raposa" && url1 === "") {
        settitulo("Raposas");
        setIsLoading(true);

        await axios
          .get("https://randomfox.ca/floof/")
          .then((response) => {
            console.log("Dados da API:", response);
            u_ere_eles.push(response.data.image);
          })
          .catch((error) => {
            console.log(error);
          });

        await axios
          .get("https://randomfox.ca/floof/")
          .then((response) => {
            console.log("Dados da API:", response);
            u_ere_eles.push(response.data.image);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      //////////////////////////////////
      if (categoriaInicial == "museu" && url1 === "") {
        settitulo("Museus");
        setIsLoading(true);

        await axios
          .get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${
              museuIds.objectIDs[
                Math.floor(Math.random() * museuIds.objectIDs.length)
              ]
            }
          `
          )
          .then((response) => {
            console.log("Dados da API:", response);
            u_ere_eles.push(response.data.primaryImage);
          })
          .catch((error) => {
            console.log(error);
          });

        if (!(url1 != "")) {
          console.log("não tem imagem 1");
        }

        await axios
          .get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${
              museuIds.objectIDs[
                Math.floor(Math.random() * museuIds.objectIDs.length)
              ]
            }
          `
          )
          .then((response) => {
            console.log("Dados da API:", response);
            u_ere_eles.push(response.data.primaryImage);
          })
          .catch((error) => {
            console.log(error);
          });
        if (!(url2 != "")) {
          console.log("não tem imagem 2");
        }
      }

      //////////////////////////////////
      if (categoriaInicial == "sapo" && url1 === "") {
        u_ere_eles.push(
          `http://allaboutfrogs.org/funstuff/random/${String(
            Math.floor(Math.random() * 55)
          ).padStart(4, "0")}.jpg`
        );
        u_ere_eles.push(
          `http://allaboutfrogs.org/funstuff/random/${String(
            Math.floor(Math.random() * 55)
          ).padStart(4, "0")}.jpg`
        );
      }
      setUrl1(u_ere_eles[0]);
      setUrl2(u_ere_eles[1]);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };
    fetchData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          flexDirection: "column",
        }}
      >
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

        <button
          onClick={() => {
            router.push("/ranking");
          }}
          className="fixed z-50 right-6 p-4 w-10 text-white cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="yellow"
            className="bi bi-star-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        </button>

        <div
          style={{
            width: "100%",
            height: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <h1
            style={{
              background: "linear-gradient(to right, #FC6B04, #00CABF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <b>{titulo}</b>
          </h1>
        </div>
        <div
          style={{
            width: "100%",
            height: "70%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!isLoading ? (
              <Image
                src={url1}
                width={0}
                height={0}
                alt="imagem aleatória"
                sizes="100vw"
                className="foto gradient-border-laranja"
                onClick={() => {
                  if (!clicou) {
                    console.log(url1);
                    addImagem(url1.toString(), categoriaEscolhida);
                    addImagem(url2.toString(), categoriaEscolhida);
                    incrementCliquesByUrl(url1);
                    setClicou(true);
                    setTimeout(async () => {
                      const dataUrl1 = await getImagemByUrl(url1);
                      const dataUrl2 = await getImagemByUrl(url2);
                      const cliques1 = parseInt(dataUrl1.cliques);
                      const cliques2 = parseInt(dataUrl2.cliques);
                      setPorcentagem((cliques1 * 100) / (cliques1 + cliques2));

                      console.log(
                        (cliques1 * 100) / (cliques1 + cliques2) + "%"
                      );
                    }, 500);
                    setTimeout(() => {
                      window.location.reload();
                    }, 3000);
                  }
                }}
              />
            ) : null}
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!isLoading ? (
              <Image
                src={url2}
                width={0}
                height={0}
                alt="imagem aleatória"
                sizes="100vw"
                className="foto gradient-border-ciano"
                onClick={() => {
                  if (!clicou) {
                    console.log(url2);
                    addImagem(url1.toString(), categoriaEscolhida);
                    addImagem(url2.toString(), categoriaEscolhida);
                    incrementCliquesByUrl(url2);
                    setClicou(true);
                    setTimeout(async () => {
                      const dataUrl1 = await getImagemByUrl(url1);
                      const dataUrl2 = await getImagemByUrl(url2);
                      const cliques1 = parseInt(dataUrl1.cliques);
                      const cliques2 = parseInt(dataUrl2.cliques);
                      setPorcentagem((cliques1 * 100) / (cliques1 + cliques2));
                      console.log(
                        (cliques2 * 100) / (cliques1 + cliques2) + "%"
                      );
                    }, 500);
                    setTimeout(() => {
                      window.location.reload();
                    }, 3000);
                  }
                }}
              />
            ) : null}
          </div>
        </div>
        <div
          style={{
            height: "10%",
            width: "80%",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#FC6B04",
              width: `${porcentagem}%`,
              transition: "width 0.5s, opacity 0.5s",
              opacity: clicou ? 1 : 0, // Ajuste conforme necessário
            }}
            className={`h-16 border-2 jusify-start p-3 ${
              clicou ? "flex" : "hidden"
            } right-0`}
          >
            <p className="text-white font-bold text-xl">{`${
              Math.round(porcentagem * 100) / 100
            }%`}</p>
          </div>
          <div
            style={{
              backgroundColor: clicou ? "#00CABF" : "#000000",
              width: `${100 - porcentagem}%`,
              transition: "width 0.5s, opacity 0.5s",
              opacity: clicou ? 1 : 0, // Ajuste conforme necessário
            }}
            className={`h-16 border-2 text-end p-4${
              clicou ? "flex" : "hidden"
            } right-0`}
          >
            <p className="text-white font-bold text-xl p-3">{`${
              Math.round((100 - porcentagem) * 100) / 100
            }%`}</p>
          </div>
        </div>

        <nav
          className={`fixed h-full gradient-border-menu top-0 left-0 bg-black rounded-top-right-lg text-white transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } w-64 z-50`}
        >
          <div class="flex flex-col rounded-lg items-center w-full h-full overflow-hidden text-white bg-slate-900 rounded">
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
                  className="flex items-center pt-3 text-2xl text-gray-200 hover:text-white pl-8 w-full h-12 mt-2 rounded hover:bg-[#19284a]  hover:text-white"
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
                   className="flex pt-3 items-center pl-8 text-2xl w-full h-12 mt-2 rounded hover:bg-[#19284a] hover:text-white"
                    onClick={() =>
                      exibir ? setExibir(false) : setExibir(true)
                    }
                  >
                    <p
                      
                    >
                      {`Animais ${exibir?"-":"+"}`}
                    </p>

                  </button>
                </div>
                {exibir ? (
                  <>
                    <ul>
                      <li>
                        <button
                           className="flex bg-[#19284a] items-center ml-8 p-2 w-full h-12 mt-2 rounded hover:bg-[#122c66] hover:text-white"
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
                           className="flex items-center bg-[#19284a] ml-8 p-2 w-full h-12 p2 hover:bg-[#122c66] hover:text-white"
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
                           className="flex items-center bg-[#19284a] ml-8 p-2 w-full h-12 hover:bg-[#122c66] hover:text-white"onClick={() => {
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
                           className="flex items-center bg-[#19284a] ml-8 p-2 w-full h-12 hover:bg-[#122c66] hover:text-white"onClick={() => {
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
                   className="flex pt-3 items-center text-2xl pl-8 w-full h-12 mt-2 hover:bg-[#19284a] hover:text-white"onClick={() => {
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
        {isLoading ? (
          <>
            <div
              className="absolute left-1/2 top-1/2 scale-[400%] align-center"
              role="status"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 animate-spin"
                viewBox="0 0 100 101"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Definindo o gradiente */}{" "}
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#FC6B04", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#00CABF", stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="url(#gradient)"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="url(#gradient)"
                />
              </svg>
            </div>
            <span className=" absolute left-[49%] top-1/2 text-lg text-white ">
              Loading...
            </span>
          </>
        ) : null}
      </div>
    </>
  );
}
