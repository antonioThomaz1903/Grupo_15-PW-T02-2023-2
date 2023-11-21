"use client";
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConnection';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleEmailLogin(e){
    setEmail(e.target.value);
  }

  function handleSenhaLogin(e){
    setSenha(e.target.value);
  }

  function login(){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      router.push('\game');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  return (
    <main className='container w-screen h-screen flex flex-column justify-center items-center algn-center'>
      <div className="w-3/6 flex flex-column items-center">
        <div className="w-full text-start m-2">Login</div>
        <textarea className="w-full flex flex-column justify-center text-black" onChange={handleEmailLogin}></textarea>
        <div className="w-full text-start m-2">Senha</div>
        <textarea className="w-full flex flex-column justify-center rounded- text-black pass" onChange={handleSenhaLogin}></textarea>
        <button className="w-32 flex flex-column justify-center self-end">Esqueci a senha</button>
        <button className=" botaoLogin  bg-laranja"  onClick={()=>{login()}}>Entrar</button>
        <button className=" botaoLogin  bg-ciano" onClick={()=>{router.push("/cadastro")}}>Cadastrar</button>
      </div>
    </main>
  )
}



