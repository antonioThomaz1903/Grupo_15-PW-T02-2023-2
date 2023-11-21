"use client";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { auth } from '../../firebaseConnection';

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function cadastrar(){
    createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      router.push('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  function handleEmail(e){
    setEmail(e.target.value);
  }

  function handleSenha(e){
    setSenha(e.target.value);
  }

  return (
    <main>
      <div className="container w-screen h-screen flex flex-column justify-center items-center algn-center">
        <div className="font-bold text-center my-8 text-4xl ">
          INFORME SEUS DADOS
        </div>
        <div className="w-3/6 flex flex-column justify-center">
          <div> NOME COMPLETO </div>
          <textarea className="w-full rounded-sm text-black"></textarea>

          <div> EMAIL </div>
          <textarea className="w-full rounded-sm text-black" onChange={handleEmail}></textarea>

          <div> DATA DE NASCIMENTO </div>
          <textarea className="w-full rounded-sm text-black"></textarea>

          <div> SENHA </div>
          <textarea className="w-full rounded-sm text-black" onChange={handleSenha}></textarea>

          <div> CONFIRME A SENHA </div>
          <textarea className="w-full rounded-sm text-black"></textarea>

          <br></br>
          <button className="w-full h-12 rounded-md bg-laranja mt-10" onClick={()=>{cadastrar()}}>
            CADASTRAR
          </button>
          <br></br>
        </div>
      </div>
    </main>
  );
}
