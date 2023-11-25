import { auth, userB } from '../firebaseConnection'
import { signOut } from 'firebase/auth';
import { setUserB } from '../firebaseConnection';

export function logout(){
    const user = auth.currentUser;

    if(user){
        signOut(auth)
        .then(() => {
            console.log("Logout realizado com sucesso");
            setUserB(false);
        })
        .catch((error) => {
            console.log("Erro ao realizar logout: " + error);
        })
    }
    else{
        console.log("Usuário já está deslogado.");
    }
    
}