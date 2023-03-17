export class gitHubApi {

    static Consultar(username) {
    
        return fetch(`https://api.github.com/users/${username}`).then(userapi => userapi.json()) 

        
    }



}