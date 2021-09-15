import {
    Layout, Menu, Card
  } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'

import {Link} from "react-router-dom"
import './styles.css'

import {createBurger} from "../../services/burger_ws"
import {getallBurgers} from "../../services/burger_ws"

const { Meta } = Card;
const { Header, Content, Footer } = Layout;

Swal.bindClickHandler({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })
  

function BurgerCreator ()  {
   
const [burger,setBurger] = useState ({
    burgername: "",
    category: "",
    price:"",
    meat:"",
    bread:"",
    cheese:"",
    toppings:"",
    fries:"",
    restaurantbyname:"",
    comment:"",
    picture:""
})

const [allburgers,setallBurgers]=useState ([])

    async function getData(){
        try{
            const {data} = await getallBurgers()
            console.log(data)
            setallBurgers(data.burgers)
        }
        catch(error) {
            console.log(error)
        }
    }

    useEffect(()=>{getData()},[])

    const handleChange = (event) => {
        setBurger( prevState => ({
            ...prevState,
            [event.target.id]: event.target.value
        })

        )
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        console.log("hola",burger)
        const formData = new FormData();

    for(let key in burger){
      formData.append(key, burger[key])
    }
        createBurger(formData)
        .then(response=> console.log("la respuesta",response))
        .catch(error=> console.log("la error",error))
    }

    

    const uploadFile = (e) => {
        console.log(e.target.files)
        setBurger({...burger, picture:e.target.files[0]})
      }

    

        console.log (burger);

        return (
            <div className= "main">
            <Layout styles={{height:"90vh"} }>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1"> <Link to="/">Inicio</Link> </Menu.Item>
              <Menu.Item key="2"><Link to="/burger-create">Crear Hamburguesa</Link></Menu.Item>
              <Menu.Item key="3"> <Link to="/login">Login</Link> </Menu.Item>
            </Menu>
          </Header>
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <div className= "formulario">

                           <label for="burgername"> Nombre de la Hamburguesa:
                                <input 
                                type="text" 
                                id="burgername" 
                                value={burger.burgername}
                                onChange={handleChange}/>
                            </label>

                            <label for="category"> Tipo de Hamburguesa:
                                <select 
                                    id="category"
                                    onChange={handleChange}
                                    value={burger.category}
                                >
                                    <option value="Cheeseburger (Classic)">Cheeseburger clásica</option>
                                    <option value="Smash">Smash</option>
                                    <option value="Veggie">Veggie</option>
                                    <option value="Slider">Slider</option>
                                    <option value="Monster">Monster</option>
                                    <option value="Gourmet">Gourmet</option>
                                </select>
                            </label>

                            <label for="price"> Precio:
                                <input 
                                type="Number" 
                                id="price" 
                                value={burger.price}
                                onChange={handleChange}/>
                            </label>


                            <label for="meat"> La Carne:
                                <select 
                                    id="meat"
                                    value={burger.meat}
                                    onChange={handleChange}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>   
                                </select>
                            </label>

                            <label for="bread"> El pan:
                                <select 
                                    id="bread"
                                    value={burger.bread}
                                    onChange={handleChange}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>   
                                </select>
                            </label>

                            <label for="cheese"> El queso:
                                <select 
                                    id="cheese"
                                    value={burger.cheese}
                                    onChange={handleChange}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>   
                                </select>
                            </label>

                            <label for="toppings"> Los Toppings:
                                <select 
                                    id="toppings"
                                    value={burger.toppings}
                                    onChange={handleChange}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>   
                                </select>
                            </label>

                            <label for="fries"> Las papas:
                                <select 
                                    id="fries"
                                    value={burger.fries}
                                    onChange={handleChange}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>   
                                </select>
                            </label>

                            <label for="restaurantbyname"> Restaurante:
                            <input 
                                type="text" 
                                id="restaurantbyname" 
                                value={burger.restaurantbyname}
                                onChange={handleChange}/>
                            </label>

                            <label for="comment"> Deja un Comentario:
                            <input 
                                type="text" 
                                id="comment" 
                                value={burger.comment}
                                onChange={handleChange}/>
                            </label>

                            <input type="file" name="picture" id="picture" onChange={uploadFile}/>


                            <button onClick={handleSubmit, Swal.fire()}>Send</button>
                            
                         </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>BRGR.CLUB ©2021 Created by Víctor Hernández</Footer>
        </Layout>
                       
            </div>
            )
    }

export default BurgerCreator;