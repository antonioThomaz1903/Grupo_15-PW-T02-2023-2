import { auth } from '../firebaseConnection'
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

export function logout(){
    const user = auth.currentUser;
    const router = useRouter();

    if(user){
        signOut(auth)
        .then(() => {
            console.log("Logout realizado com sucesso");
        })
        .catch((error) => {
            console.log("Erro ao realizar logout: " + error);
        })
    }
    else{
        console.log("Usuário já está deslogado.");
    }
    
    return (
        <>{()=>{router.push("/")}}</>
    )

}