export default function Page( ){
    return(

        <main>

            <div className="titulo"> INFORME SEUS DADOS </div>

            <div className="container centro">

                <div className="container-texto"> 
                    <div>  NOME COMPLETO </div>
                    <textarea className="texto_cad"></textarea>

                    <div>  EMAIL </div>
                    <textarea className="texto_cad"></textarea>

                    <div>  DATA DE NASCIMENTO </div>
                    <textarea className="texto_cad"></textarea>

                    <div>  SENHA  </div>
                    <textarea className="texto_cad"></textarea>

                    <div>  CONFIRME A SENHA </div>
                    <textarea className="texto_cad"></textarea>


                    <br></br>
                    <button className="botao laranja mt-10">CADASTRAR</button>
                    <br></br>
                </div>
            </div>
        </main>

    )
}



