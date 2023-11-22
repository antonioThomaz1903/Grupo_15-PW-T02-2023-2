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
async function addImagem(url, categoria) {
    const q = query(collection(db, "imagem"), where("url", "==", url), limit(1));

    try {
        const imagemSnap = await getDocs(q);

        if (imagemSnap.empty) {
            // A imagem não existe, então podemos adicioná-la
            await addDoc(collection(db, "imagem"), {
                url: url,
                cliques: 1,
                categoria: categoria
            });
            console.log("Imagem adicionada no banco");
        } else {
            // A imagem já existe, não fazemos nada
            console.log("Imagem já existe no banco. Nenhuma ação realizada.");
        }
    } catch (error) {
        console.log("ERRO AO VERIFICAR/ADICIONAR IMAGEM: " + error);
    }
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

    try {
        const imagemSnap = await getDocs(q);

        if (!imagemSnap.empty) {
            const doc = imagemSnap.docs[0];
            const qtd = (doc.data().cliques || 0) + 1; // Certifique-se de lidar com a situação em que cliques não existe
            await updateDoc(doc.ref, {
                cliques: qtd,
            });
            console.log("Incremento realizado com sucesso.");
        } else {
            console.log("Documento não encontrado para a URL fornecida.");
        }
    } catch (error) {
        console.log("ERRO AO INCREMENTAR: " + error);
    }
}

async function getImagemByUrl(url){
    const q = query(collection(db, "imagem"), where("url", "==", url), limit(1));

    try {
        const imagemSnap = await getDocs(q);

        if (!imagemSnap.empty) {
            const doc = imagemSnap.docs[0]; 
            return {
                id: doc.data().id,
                url: doc.data().url,
                categoria: doc.data().categoria,
                cliques: doc.data().cliques
            };
        } else {
            console.log("Documento não encontrado para a URL fornecida.");
        }
    } catch (error) {
        console.log("ERRO AO ENCONTRAR: " + error);
    }
    return null;
}

export { addImagem, getImagens, getImagensByClickCount, incrementCliquesByUrl, getImagemByUrl};