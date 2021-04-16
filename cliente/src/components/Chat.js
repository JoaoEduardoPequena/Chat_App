import React,{useState,useEffect} from "react";
import dotenv from "dotenv";
import uuid from 'react-uuid'; // modulo npm que tem uma função que permite gerar um id automaticamente
import axios from 'axios';
import io from "socket.io-client";

const urlApi= "http://localhost:5000";
let socket = io(urlApi);
socket.on('connect', ( )=>{console.log(`conexão do socket com front-end feito com sucesso ${socket.id}`)} );
//const soket = io.connect(urlApi);

export const Chat=()=>{

    let [mensagem,setMensagem]= useState(""); // Variavel
    const [state, setState] = useState({ message: '', name: '' })
    const [chat, setChat] = useState([])

    useEffect( ()=>{

      socket.on('chat.message1', (data)=>{
        setChat([...chat,{...data}])
        console.log("mensagem vindo do servidor",data);
      })

      return () => {

      }


    },[chat] );

    console.log("soket",socket);

    //const urlApi= "http://localhost:5000";

    const handleChangeMensagem=(event)=>{
      setMensagem(event.target.value);
    }

    //let socket = io(urlApi);

    const onTextChange = e => {
      setState({ ...state, [e.target.name]: e.target.value })
    }
 

 const onMessageSubmit = e => {
   e.preventDefault()
   if(!state.name) return null  // se o campo state.name não tive nada retorna null
  //const { name, message } = state
  //setChat([...chat,{...state}]);
  console.log("list chat message",chat);
  //socket.emit('message', { name, message }); // Enviar/emitir mensagem para o servidor
  socket.emit('chat.message', {...state}); // Enviar/emitir mensagem para o servidor
  setState({});
  
 
}

const renderChat = () => {
  return chat.map( ( {name,message}, index) => (
    <div  style={{textDecoration:'none'}}  key={index}>
      <ul>
        <li> {name}: <span>{message}</span> </li>
      </ul>
    </div>
  ))
}

return(

<div className="card">

<div className="card-header text-center"> CHAT</div>

<div className="card-body">

<form >

<div className="container-fluid">

<div className="row mb-1">
  <div className="col-md-6 col-xs-12">
      <label htmFor="Usuario" >Digita aqui o teu nome antes de enviar a mensagem</label>
     <input type="text" className="form-control" name="name" value={state.name || "" } onChange={e => onTextChange(e)} />
  </div>
</div>

<div className="row">
  <div className="col-md-9 col-xs-12" style={{height:'200px'}}>
  
        {renderChat()}

  </div>
</div>

<div className="row">
  <div className="col-md-9 col-xs-12">
      <label htmFor="Mensagem">Mensagem</label>
      <input type="text" className="form-control" name="message" value={state.message || ""}  onChange={e => onTextChange(e)} />
  </div>
</div>



<div className="row mt-1 mb-1">
  <div className="col-sm-9">
      <button type="button" onClick={onMessageSubmit} className="btn btn-primary">Enviar Mensagem</button>
  </div>
</div>

</div>

</form>


</div>


</div>


)

}