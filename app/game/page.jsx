"use client"; 

import Foto from "./foto";

export default function Page() {
  return (
    <div style={{width:'100vw',height:'100vh', color:'white'}}>
      <div style={{ width: '100%', height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1>
          <b>THIS OR THAT</b>
        </h1>
      </div>
      <div style={{ width: '100%', height:'80%', display: 'flex'}}>
        <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Foto
            lado='D'
          />
        </div>
        <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Foto
            lado='E'
          />
        </div>
      </div>
      <div style={{height:'10%', width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Rodapé</h1>
      </div>
    </div>
  );
}
