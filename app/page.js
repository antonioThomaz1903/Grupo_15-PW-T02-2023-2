"use client";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <main className='container w-screen h-screen flex flex-column justify-center items-center algn-center'>
      <div className="w-3/6 flex flex-column items-center">
        <div className="w-full text-start m-2">Login</div>
        <textarea className="w-full flex flex-column justify-center"></textarea>
        <div className="w-full text-start m-2">Senha</div>
        <textarea className="w-full flex flex-column justify-center rounded-"></textarea>
        <button className="w-32 flex flex-column justify-center self-end">Esqueci a senha</button>
        <button className="w-1/3 h-12 border-2 border-white content-center bg-laranja rounded-md m-4 duration-500 hover:scale-110 hover:shadow-xl"  onClick={()=>{router.push("/game")}}>Entrar</button>
        <button className="w-1/3 h-12 border-2 border-white text-center bg-ciano rounded-md duration-500 hover:scale-110 hover:shadow-xl" onClick={()=>{router.push("/cadastro")}}>Cadastrar</button>
      </div>
    </main>
  )
}



