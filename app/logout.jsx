import { auth, userB } from '../firebaseConnection'
import { signOut } from 'firebase/auth';

export function logout(){
    const user = auth.currentUser;

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
    
}