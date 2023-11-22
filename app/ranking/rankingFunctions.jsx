import { db } from '../../firebaseConnection';
import { 
    collection,
    addDoc,
    getDocs,
    updateDoc,
    query,
    where,
    orderBy,
    limit
} from 'firebase/firestore';

/**
 * Adiciona imagem no banco de dados.
 * @param {*} url url da imagem.
 * @param {*} categoria categoria da imagem.
 */
async function addImagem(url, categoria){
    await addDoc(collection(db, "imagem"), {
        url: url,
        cliques: 0,
        categoria: categoria
    })
    .then(() => {
        console.log("Imagem adicionada no banco");
    })
    .catch((error) => {
        console.log("ERRO AO ADICIONAR IMAGEM: " + error);
    });
}

/**
 * Le todas as imagens do banco de dados.
 * @returns Lista de imagens.
 */
async function getImagens () {
    let lista = [];
    await getDocs(collection(db, "imagem"))
    .then((snapshot) =>{
        snapshot.forEach((doc) => {
            lista.push({
                id: doc.data().id,
                url: doc.data().url,
                cliques: doc.data().url,
                categoria: doc.data().categoria
            });
        });
    })
    .catch((error) => {
        console.log("ERRO AO BUSCAR IMAGENS: " + error);
    })

    return lista;
}

/**
 * Le as imagens de uma categoria ordenadas decrescentemente por quantidade de cliques.
 * @param {*} categoria categoria da imagem.
 * @returns lista de imagens.
 */
async function getImagensByClickCount(categoria){
    let lista = [];
    const q = query(collection(db, "imagem"), where("categoria", "==", categoria),
              orderBy("cliques", "desc"), limit(10));

    await getDocs(q)
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            lista.push({
                id: doc.data().id,
                url: doc.data().url,
                cliques: doc.data().cliques,
                categoria: doc.data().categoria
            })
        })
    })
    .catch((error) => {
        console.log("ERRO NA QUERY: " + error);
    })
    
    return lista;
}

/**
 * Incrementa em um a qtd de cliques de uma imagem.
 * @param {*} url url da imagem.
 */
async function incrementCliquesByUrl(url) {
    const q = query(collection(db, "imagem"), where("url", "==", url), limit(1));
    await getDocs(q)
    .then((imagemSnap) => {
        imagemSnap.forEach((doc) => {
            updateDoc(doc, {
            url: imagem.data().url,
            cliques: qtd,
            categoria: imagem.data().categoria
            });
        });
    })
    .catch((error) => {
        console.log("ERRO AO INCREMENTAR: " + error);
    });
}

export { addImagem, getImagens, getImagensByClickCount, incrementCliquesByUrl};