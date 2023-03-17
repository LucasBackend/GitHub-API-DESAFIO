import { gitHubApi } from "./gitAPI.js"

class favoritesUser {

    constructor(root){

        this.root = document.querySelector(root)
        this.loadUser()

        

    }

    loadUser(){
        
        
      
        this.entries = JSON.parse(localStorage.getItem('@gitfavUser')) || []

    

    }

async addFavoriteUser(username){

    try{

        if(this.entries.find(entries => entries.login.toLowerCase() == username.toLowerCase())){
          throw new Error('Este usuário já está favoritado!!')
        }
        const {name,login,public_repos,followers} =  await gitHubApi.Consultar(username)
            
        const user = {name,login,public_repos,followers}

        if(user.name == undefined){
            throw new Error('Usuário não encontrado!')
        }

        



      this.entries = [user,...this.entries]

      this.updateUser()
      this.saveEntries()
      this.TablenovisibleContent()
      this.root.querySelector('input').value = ''
    }

    catch(e){
        alert(e)
    }


}

    deleteFavorite(user){

       this.entries =  this.entries.filter(entries => entries!==user)

       this.updateUser()
       this.saveEntries()

      

    }


}


export class favoritesView extends favoritesUser {
    
    constructor(root) {

        super(root)

        this.tbody = this.root.querySelector('.table-content')

         
  
   

        this.updateUser()
        this.onaddUser()

        
      
    }


   onaddUser(){
    this.root.querySelector('.search .addFavorite').addEventListener('click',()=>{
    
        const Userinput = this.root.querySelector('.search input').value || undefined
      
        this.addFavoriteUser(Userinput)


    })

   }

    updateUser(){

        if(this.entries.length>0){
            this.TablenovisibleContent()
        }else{
            this.TablenovisiblenoContent()
        }

        this.deleteRows()

        this.entries.forEach(user =>{

            const row = this.createRow()

            row.querySelector('.User img').src = `https://github.com/${user.login}.png`
            row.querySelector('.User img').alt = `Imagem de ${user.name}`
            row.querySelector('.User a').href = `https://github.com/${user.login}`
            row.querySelector('.User a p').textContent = user.name
            row.querySelector('.User a span').textContent = user.login
            row.querySelector('.Repositories').textContent = user.public_repos
            row.querySelector('.Followers').textContent = user.followers
            
            row.querySelector('.Remove').addEventListener('click',()=>{

                this.deleteFavorite(user)



            })
            







           this.tbody.append(row)










        })

    }


    createRow(){

    const tr = document.createElement('tr')
   

    tr.innerHTML = `
    <td class="User">
    <img src="https://github.com/lucasbackend.png" alt="Imagem de Lucas Ribeiro">
    <a href="https://github.com/lucasbackend" target="_blank">
        <p>Lucas Ribeiro</p>
        <span>LucasBackend</span>
    </a>
</td>

<td class="Repositories">
    10
</td>

<td class="Followers">0</td>

<td class="Remove">
    <button>Remover</button>
</td>
         
    `
  

     return tr

    }

    deleteRows(){
        const tr = this.root.querySelectorAll('.table-content tr')

        tr.forEach(element => {

            element.remove()

        });
        

    }

    saveEntries(){
        localStorage.setItem('@gitfavUser',JSON.stringify(this.entries))

    }

    TablenovisibleContent(){
       
        this.root.querySelector('.table-content').classList.remove('hide-table')
        this.root.querySelector('.table-no-content').classList.add('hide-table')
       


    }

    TablenovisiblenoContent(){
       
        this.root.querySelector('.table-content').classList.add('hide-table')
        this.root.querySelector('.table-no-content').classList.remove('hide-table')
       


    }

  


}