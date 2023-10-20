"use client";
import Sidebar from "../game/Sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";

const images = [
  {
    id: 1,
    name: "Imagem 1",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn0X0cDY1hCZEH0uJeSEhby3QvgnwxcmTRKw&usqp=CAU",
  },
  {
    id: 2,
    name: "Imagem 2",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn0X0cDY1hCZEH0uJeSEhby3QvgnwxcmTRKw&usqp=CAU",
  },
  {
    id: 3,
    name: "Imagem 3",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn0X0cDY1hCZEH0uJeSEhby3QvgnwxcmTRKw&usqp=CAU",
  },
  {
    id: 4,
    name: "Imagem 4",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn0X0cDY1hCZEH0uJeSEhby3QvgnwxcmTRKw&usqp=CAU",
  },
  {
    id: 5,
    name: "Imagem 5",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn0X0cDY1hCZEH0uJeSEhby3QvgnwxcmTRKw&usqp=CAU",
  },
  {
    id: 6,
    name: "Imagem 6",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn0X0cDY1hCZEH0uJeSEhby3QvgnwxcmTRKw&usqp=CAU",
  },
  {
    id: 7,
    name: "Imagem 7",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn0X0cDY1hCZEH0uJeSEhby3QvgnwxcmTRKw&usqp=CAU",
  },
  {
    id: 8,
    name: "Imagem 8",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn0X0cDY1hCZEH0uJeSEhby3QvgnwxcmTRKw&usqp=CAU",
  },
  {
    id: 9,
    name: "Imagem 9",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn0X0cDY1hCZEH0uJeSEhby3QvgnwxcmTRKw&usqp=CAU",
  },
  {
    id: 10,
    name: "Imagem 10",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn0X0cDY1hCZEH0uJeSEhby3QvgnwxcmTRKw&usqp=CAU",
  },
];

const Top10 = () => {
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
          <div key={images[1].id} className="mb-16 mr-32 text-center">
            <h2>2° lugar</h2>
            <img src={images[1].src} alt={images[1].name} />
            <p>Ciclano</p>
          </div>

          <div key={images[0].id} className="mb-32 mr-32 text-center">
            <h2>1° lugar</h2>
            <img src={images[0].src} alt={images[0].name} />
            <p>Fulano</p>
          </div>

          <div key={images[2].id} className="mb-0 text-center">
            <h2>3° lugar</h2>
            <img src={images[2].src} alt={images[2].name} />
            <p>Beltrano</p>
          </div>
        </div>

        <h2>Outras Imagens</h2>
        <ul>
          {otherImages.map((image) => (
            <li className="flex flex-row items-center" key={image.id}>
              <h2>{image.id}°</h2>
              <img
                className="w-28 h-28 m-4"
                src={image.src}
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
