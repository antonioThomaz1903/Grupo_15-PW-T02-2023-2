"use client";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebaseConnection";
import { ToastContainer, toast } from "react-toastify";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function cadastrar() {
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Usuário cadastrado com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);

        switch (error.code) {
          case "auth/weak-password":
            toast.error("Senha muito fraca!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
            });
            break;

          case "auth/email-already-in-use":
            toast.error("E-mail já em uso por outra conta!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
            });
            break;
          case "auth/invalid-email":
            toast.error("Endereço de e-mail inválido!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
            });
            break;
        }
      });
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleSenha(e) {
    setSenha(e.target.value);
  }

  return (
    <main>
      <div className="container w-screen h-screen flex flex-column justify-center items-center algn-center">
        <div className="font-bold text-center my-8 text-4xl ">
          INFORME SEUS DADOS
        </div>
        <div className="w-3/6 flex flex-column justify-center">
          <div className="text-xl font-semibold mt-8"> NOME COMPLETO </div>
          <input
            className="w-full h-12 rounded-sm text-black text-lg"
            required
          ></input>

          <div className="text-xl font-semibold mt-6"> EMAIL </div>
          <input
            className="w-full h-12 rounded-sm text-black text-lg"
            required
            onChange={handleEmail}
            type="email"
          ></input>

          <div className="text-xl font-semibold mt-6"> DATA DE NASCIMENTO </div>
          <input
            type="date"
            className="w-full h-12 rounded-sm text-black text-lg"
            required
          ></input>

          <div className="text-xl font-semibold mt-6"> SENHA </div>
          <input
            className="w-full h-12 rounded-sm text-black  text-lg"
            onChange={handleSenha}
            type="password"
            required
          ></input>

          <div className="text-xl font-semibold mt-6"> CONFIRME A SENHA </div>
          <input
            className="w-full h-12 rounded-sm text-black  text-lg"
            type="password"
            required
          ></input>

          <br></br>
          <button className="w-full h-12 rounded-md bg-[#FC6B04] mt-10 hover:scale-110 duration-500 border-2 border-white" onClick={cadastrar}>
            CADASTRAR
          </button>
          <br></br>
        </div>
      </div>
    </main>
  );
}
