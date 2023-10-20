import { useState } from "react";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const [exibir, setExibir] = useState(false);

  return (
    <nav
      className={`fixed h-full top-0 left-0 bg-black text-white p-t-4 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-64 z-50`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Categorias</h1>
        <button onClick={closeSidebar} className="text-white text-xl font-bold">
          X
        </button>
      </div>
      <ul style={{ width: "100%", width: "100%", padding: "0px" }}>
        <li className="mb-2" style={{ backgroundColor: "#333333" }}>
          <a href="/game" style={{ textDecoration: "none" }}>
            <h1
              className="text-white border-b-4 border-gray"
              style={{ fontSize: "25px" }}
            >
              Aleatório
            </h1>
          </a>
        </li>
        <li
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#333333",
          }}
          className="mb-2"
        >
          <a href="/game" style={{ textDecoration: "none" }}>
            <h1
              className="text-white border-b-4 border-gray"
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
            onClick={() => (exibir ? setExibir(false) : setExibir(true))}
          >
            <a>{exibir ? "-" : "+"}</a>
          </button>
          {exibir ? (
            <ul>
              <li className="mb-2" style={{ backgroundColor: "#555555" }}>
                <a href="/game" style={{ textDecoration: "none" }}>
                  <h1
                    className="text-white border-b-4 border-gray"
                    style={{ fontSize: "20px" }}
                  >
                    Cachorro
                  </h1>
                </a>
              </li>
              <li className="mb-2" style={{ backgroundColor: "#555555" }}>
                <a href="/game" style={{ textDecoration: "none" }}>
                  <h1
                    className="text-white border-b-4 border-gray"
                    style={{ fontSize: "20px" }}
                  >
                    Gato
                  </h1>
                </a>
              </li>
              <li className="mb-2" style={{ backgroundColor: "#555555" }}>
                <a href="/game" style={{ textDecoration: "none" }}>
                  <h1
                    className="text-white border-b-4 border-gray"
                    style={{ fontSize: "20px" }}
                  >
                    Répteis
                  </h1>
                </a>
              </li>
              <li className="mb-2" style={{ backgroundColor: "#555555" }}>
                <a href="/game" style={{ textDecoration: "none" }}>
                  <h1
                    className="text-white border-b-4 border-gray"
                    style={{ fontSize: "20px" }}
                  >
                    Marinhos
                  </h1>
                </a>
              </li>
            </ul>
          ) : null}
        </li>
        <li className="mb-2" style={{ backgroundColor: "#333333" }}>
          <a href="/game" style={{ textDecoration: "none" }}>
            <h1
              className="text-white border-b-4 border-gray"
              style={{ fontSize: "25px" }}
            >
              Objetos
            </h1>
          </a>
        </li>
        <li className="mb-2" style={{ backgroundColor: "#333333" }}>
          <a href="/game" style={{ textDecoration: "none" }}>
            <h1
              className="text-white border-b-4 border-gray"
              style={{ fontSize: "25px" }}
            >
              Famosos
            </h1>
          </a>
        </li>
        <li className="mb-2" style={{ backgroundColor: "#333333" }}>
          <a href="/game" style={{ textDecoration: "none" }}>
            <h1
              className="text-white border-b-4 border-gray"
              style={{ fontSize: "25px" }}
            >
              Filmes
            </h1>
          </a>
        </li>
        <li className="mb-2" style={{ backgroundColor: "#333333" }}>
          <a href="/game" style={{ textDecoration: "none" }}>
            <h1
              className="text-white border-b-4 border-gray"
              style={{ fontSize: "25px" }}
            >
              Comida
            </h1>
          </a>
        </li>
        <li className="mb-2" style={{ backgroundColor: "#333333" }}>
          <a href="/game" style={{ textDecoration: "none" }}>
            <h1
              className="text-white border-b-4 border-gray"
              style={{ fontSize: "25px" }}
            >
              Musica
            </h1>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
