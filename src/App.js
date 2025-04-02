import React, { useEffect, useState } from "react";
import { supabase } from "./createClient";
import './App.css';

function App(){
const [users, setUsers] = useState([])
const [user, setUser] = useState({
  name: '', age: ''
})
const [user2, setUser2] = useState({
  name2: '', age2: ''
})

console.log(user)

useEffect(() =>{
  databaseUser();
},[])

// lendo usuarios READ
  async function databaseUser() {
    const {data} = await supabase
    .from('users')
    .select('*')
    setUsers(data);
    console.log(data);
  }

  // criando usuarios
  async function createUser(event) {
    event.preventDefault(); // 🚀 Isso evita que a página recarregue
    
    const { data, error } = await supabase
      .from('users')
      .insert({ name: user.name, age: user.age });
  
    if (error) {
      console.log(error);
    } else {
      console.log("Usuário cadastrado:", data);
      databaseUser(); // Atualiza a lista de usuários após cadastrar
    }
  }

  //deletar usuarios
  async function deleteUser(userId) {
    const {data, error} = await supabase
    .from('users')
    .delete()
    .eq('id', userId)
    databaseUser();

    if(error){
      console.log(error)
    }

    if(data){
      console.log(data)
    }
  }
  


  //atualizar a lista de usuarios
  function handleChange(event){
    setUser(prevFormData =>{
      return{
        ...prevFormData,
        [ event.target.name] :event.target.value
      }
    })
  }

  function displayUser(userId) {
    users.map((user) => {
      if (user.id === userId) {
        setUser2({ name: user.name, age: user.age });
      }
    });
  }
  


  return(
    <div>
      <form onSubmit={createUser}>
        <input
          type="text"
          placeholder="digite seu nome"
          name="name"
          onChange={handleChange}

        />
        <input
          type="number"
          placeholder="digite sua idade"
          name="age"
          onChange={handleChange}

        />

        <button type="submit">Create</button>
      </form>

      <form onSubmit={createUser}>
        <input
          type="text"
          placeholder="digite seu nome"
          name="name"
          onChange={handleChange}
          defaultValue={user2.name}
        />
        <input
          type="number"
          placeholder="digite sua idade"
          name="age"
          onChange={handleChange}
          defaultValue={user2.age}
        />

        <button type="submit">Save changes</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((users) =>
            <tr>
            <td>{users.id}</td>
            <td>{users.name}</td>
            <td>{users.age}</td>
            <td><button onClick={() => deleteUser(users.id)}>Delete</button></td>
            <td><button onClick={() => displayUser(users.id)}>Edit</button></td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}


export default App;