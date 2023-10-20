"use client";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
  return (
    <main>
      <div className="container w-screen h-screen flex flex-column justify-center items-center algn-center">
        <div className="font-bold text-center my-8 text-4xl ">
          INFORME SEUS DADOS
        </div>
        <div className="w-3/6 flex flex-column justify-center">
          <div> NOME COMPLETO </div>
          <textarea className="w-full rounded-sm"></textarea>

          <div> EMAIL </div>
          <textarea className="w-full rounded-sm"></textarea>

          <div> DATA DE NASCIMENTO </div>
          <textarea className="w-full rounded-sm"></textarea>

          <div> SENHA </div>
          <textarea className="w-full rounded-sm"></textarea>

          <div> CONFIRME A SENHA </div>
          <textarea className="w-full rounded-sm"></textarea>

          <br></br>
          <button className="w-full h-12 rounded-md bg-laranja mt-10" onClick={()=>{router.push("/game")}}>
            CADASTRAR
          </button>
          <br></br>
        </div>
      </div>
    </main>
  );
}
