"use client";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, setUserB } from "../firebaseConnection";
import { useState, useEffect } from "react";
import { setCookie } from "nookies";
import {  toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [userDetail, setUserDetail] = useState({});

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleEmailLogin(e) {
    setEmail(e.target.value);
  }

  function handleSenhaLogin(e) {
    setSenha(e.target.value);
  }

  useEffect(() => {
    // Esta função verifica se o usuário está logado ou não no sistema e retorna true ou false
    async function checkLogin() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //se tem usuário logado ele entra aqui
          console.log(user);
          setUserB(true);
          setUserDetail({
            uid: user.uid,
            email: user.email,
          });
        } else {
          // não possui usuário logado
          setUserB(false);
          setUserDetail({});
        }
      });
    }

    checkLogin();
  }, []);

  async function login() {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
  
      setCookie(null, "usuario", userCredential.user, {
        maxAge: 4 * 60 * 60,
        path: "/",
      });
  
      const user = userCredential.user;
      setUserB(true);
      router.push("game");
  
      toast.success("Login realizado com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      let message;
  
      switch (errorCode) {
        case "auth/invalid-login-credentials":
          message = "Informações incorretas!";
          break;
          case "auth/missing-password":
            message = "Senha não informada!";
            break;
        default:
          message = `Erro ao validar usuário: ${errorMessage}`;
      }
  
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  }

  return (
    <main className="container w-screen h-screen flex flex-column justify-center items-center algn-center">
      <div className="w-3/6 flex flex-column items-center scale-125">
        <div className="w-full text-start m-2">Login</div>
        <input
          className="w-full pl-2 h-10 rounded-md flex flex-column justify-center text-black"
          onChange={handleEmailLogin}
        ></input>
        <div className="w-full text-start m-2">Senha</div>
        <input
          className="w-full p-2 h-10 rounded-md flex flex-column justify-center rounded- text-black pass"
          onChange={handleSenhaLogin}
          type="password"
        ></input>
        <button className="w-32 flex flex-column justify-center self-end">
          Esqueci a senha
        </button>
        <button
          className=" botaoLogin  bg-[#FC6B04]"
          onClick={() => {
            login();
          }}
        >
          Entrar
        </button>
        <button
          className=" botaoLogin  bg-[#03cec4]"
          onClick={() => {
            router.push("/cadastro");
          }}
          onKeyDown={() => {
            router.push("/game");
          }}
        >
          Cadastrar
        </button>
      </div>
    </main>
  );
}
