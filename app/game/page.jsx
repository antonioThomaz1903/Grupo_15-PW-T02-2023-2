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
  getImagens,
  getImagensByClickCount,
  incrementCliquesByUrl,
} from "../ranking/rankingFunctions";
import { getAuth, signOut } from "firebase/auth";

export default function Page() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  
  const [exibir, setExibir] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [clicou, setClicou] = useState(false);

  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");

  const [titulo, settitulo] = useState("");

  const [categoriaEscolhida, setCategoriaEscolhida] = useState("");

  const [requisitionURL, setRequisitionURL] = useState("");

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

    const fetchData = async () => {
      //////////////////////////////////
      if (categoriaInicial == "cachorro") {
        settitulo("Cachorros");

        axios
          .get("https://dog.ceo/api/breeds/image/random")
          .then((response) => {
            console.log("Dados da API:", response);
            setUrl1(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });

        axios
          .get("https://dog.ceo/api/breeds/image/random")
          .then((response) => {
            console.log("Dados da API:", response);
            setUrl2(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      //////////////////////////////////
      if (categoriaInicial == "gato") {
        settitulo("Gatos");
        try {
          const response = await fetch(
            "https://api.thecatapi.com/v1/images/search"
          );
          if (!response.ok) {
            throw new Error("Erro na requisição");
          }

          const data = await response.json();
          if (data.length > 0 && data[0].url) {
            setUrl1(data[0].url);
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
            setUrl2(data[0].url);
          } else {
            throw new Error("Nenhuma URL encontrada na resposta");
          }
        } catch (error) {
          console.error("Erro na requisição:", error);
          return null;
        }
      }

      //////////////////////////////////
      if (categoriaInicial == "aleatorio") {
        settitulo("Aleatório");
        axios
          .get("https://dog.ceo/api/breeds/image/random")
          .then((response) => {
            console.log("Dados da API:", response);
            setUrl1(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });

        axios
          .get("https://dog.ceo/api/breeds/image/random")
          .then((response) => {
            console.log("Dados da API:", response);
            setUrl2(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      //////////////////////////////////
      if (categoriaInicial == "raposa") {
        settitulo("Raposas");

        axios
          .get("https://randomfox.ca/floof/")
          .then((response) => {
            console.log("Dados da API:", response);
            setUrl1(response.data.image);
          })
          .catch((error) => {
            console.log(error);
          });

        axios
          .get("https://randomfox.ca/floof/")
          .then((response) => {
            console.log("Dados da API:", response);
            setUrl2(response.data.image);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      //////////////////////////////////
      if (categoriaInicial == "museu") {
        settitulo("Museus");
        axios
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
            setUrl1(response.data.primaryImage);
          })
          .catch((error) => {
            console.log(error);
          });

        if (!(url1 != "")) {
          console.log("não tem imagem 1");
        }

        axios
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
            setUrl2(response.data.primaryImage);
          })
          .catch((error) => {
            console.log(error);
          });
        if (!(url2 != "")) {
          console.log("não tem imagem 2");
        }
      }

      //////////////////////////////////
      if (categoriaInicial == "sapo") {
        setUrl1(
          `http://allaboutfrogs.org/funstuff/random/${String(
            Math.floor(Math.random() * 55)
          ).padStart(4, "0")}.jpg`
        );
        setUrl2(
          `http://allaboutfrogs.org/funstuff/random/${String(
            Math.floor(Math.random() * 55)
          ).padStart(4, "0")}.jpg`
        );
      }
    };
    fetchData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const router = useRouter();

  return (
    <>
      {user ? (
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
              height: "80%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={url1}
                width={0}
                height={0}
                alt="imagem aletatória"
                sizes="100vw"
                className="foto"
                style={{
                  width: "75%",
                  height: "75%",
                  borderRadius: "10px",
                  border: "10px solid #00CABF",
                }}
                onClick={() => {
                  if (!clicou) {
                    console.log(url1);
                    addImagem(url1.toString(), categoriaEscolhida);
                    incrementCliquesByUrl(url1);
                    setClicou(true);
                    setTimeout(() => {
                      window.location.reload();
                    }, 2000);
                  }
                }}
              />
            </div>
            <div
              style={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={url2}
                width={0}
                height={0}
                alt="imagem aletatória"
                sizes="100vw"
                className="foto"
                style={{
                  width: "75%",
                  height: "75%",
                  borderRadius: "10px",
                  border: "10px solid #FC6B04",
                }}
                onClick={() => {
                  if (!clicou) {
                    console.log(url2);
                    addImagem(url2.toString(), categoriaEscolhida);
                    incrementCliquesByUrl(url2);
                    setClicou(true);
                    setTimeout(() => {
                      window.location.reload();
                    }, 2000);
                  }
                }}
              />
            </div>
          </div>
          <div
            style={{
              height: "10%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>

          <nav
            className={`fixed h-full top-0 left-0 bg-black text-white p-4 transition-transform transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } w-64 z-50`}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-semibold">Categorias</h1>
              <button
                onClick={toggleSidebar}
                className="text-white text-xl font-bold"
              >
                X
              </button>
            </div>
            <ul style={{ width: "100%", width: "100%", padding: "0px" }}>
              <li className="mb-2">
                <button
                  className="w-full"
                  onClick={() => {
                    handleEscolhaCategoria("aleatorio");
                  }}
                >
                  <h1
                    className="text-white border-b-4 border-gray"
                    style={{ fontSize: "25px" }}
                  >
                    Aleatório
                  </h1>
                </button>
              </li>
              <li
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                className="mb-2"
              >
                <div className="flex flex-row justify-between">
                  <a className="w-full w-5/6">
                    <h1
                      className="text-white border-b-4 border-gray w-full"
                      style={{ fontSize: "25px" }}
                    >
                      Animais
                    </h1>
                  </a>
                  <button
                    style={{
                      position: "relative",
                      left: "0px",
                      flexDirection: "column",
                      color: "white",
                      fontsize: "20px",
                      fontWeight: "bold",
                    }}
                    onClick={() =>
                      exibir ? setExibir(false) : setExibir(true)
                    }
                  >
                    <a>{exibir ? "-" : "+"}</a>
                  </button>
                </div>
                {exibir ? (
                  <ul>
                    <li className="mb-2">
                      <button
                        className="w-full"
                        onClick={() => {
                          handleEscolhaCategoria("cachorro");
                        }}
                      >
                        <h1
                          className="text-white border-b-4 border-gray"
                          style={{ fontSize: "20px" }}
                        >
                          Cachorro
                        </h1>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        className="w-full"
                        onClick={() => {
                          handleEscolhaCategoria("gato");
                        }}
                      >
                        <h1
                          className="text-white border-b-4 border-gray"
                          style={{ fontSize: "20px" }}
                        >
                          Gato
                        </h1>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        className="w-full"
                        onClick={() => {
                          handleEscolhaCategoria("raposa");
                        }}
                      >
                        <h1
                          className="text-white border-b-4 border-gray"
                          style={{ fontSize: "20px" }}
                        >
                          Raposas
                        </h1>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        className="w-full"
                        onClick={() => {
                          handleEscolhaCategoria("sapo");
                        }}
                      >
                        <h1
                          className="text-white border-b-4 border-gray"
                          style={{ fontSize: "20px" }}
                        >
                          Sapos
                        </h1>
                      </button>
                    </li>
                  </ul>
                ) : null}
              </li>
              <li className="mb-2">
                <button
                  className="w-full"
                  onClick={() => {
                    handleEscolhaCategoria("museu");
                  }}
                >
                  <h1
                    className="text-white border-b-4 border-gray"
                    style={{ fontSize: "25px" }}
                  >
                    Museu
                  </h1>
                </button>
              </li>
            </ul>
          </nav>
          <div
            className={`fixed h-full top-0 left-0 bg-black opacity-25 z-40 transition-opacity ${
              isSidebarOpen ? "block" : "hidden"
            }`}
            onClick={toggleSidebar}
          ></div>
        </div>
      ) : (
        <div>
          {() => {
            router.push("/");
          }}
        </div>
      )}
    </>
  );
}
