import Image from "next/image";
import React, { useEffect, useState } from 'react';
import getFromAPI from "./getFromAPI";

const Foto = ({ lado }) => {
  const estiloBorda = lado === "D" ? "10px solid #FC6B04" : "10px solid #00CABF";

  const [imageUrl1, setImageUrl1] = useState('');

  useEffect(() => {
    async function fetchData() {
      const url1 = await getFromAPI('search');
      if (url1) {
        setImageUrl1(url1);
      }
    }

    fetchData();
  }, []);


  return (
    <Image
      src={imageUrl1}
      width={0}
      height={0}
      alt="imagem aletatória"
      sizes='100vw'
      className="foto"
      style={{
        width: '75%',
        height: '75%',
        borderRadius: '10px',
        border: estiloBorda,

      }} // optional
    />
  );
};

export default Foto;
