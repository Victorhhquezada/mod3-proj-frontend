import './styles.css'
import { Layout, Menu, Card, Row, Col, Modal, Button,Rate } from 'antd';
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import {getallBurgers} from "../../services/burger_ws"

const { Meta } = Card;
const { Header, Content, Footer } = Layout;




function Home ()  {
    const [burger, setBurger] = useState (null)
    const [isModalVisible, setIsModalVisible] = useState(false)
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
    ;

  const showModal = (burger) => {
    setIsModalVisible(true);
    setBurger(burger)
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

    
    return(
        <Layout styles={{height:"90vh"} }>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1"> <Link to="/">Inicio</Link> </Menu.Item>
              <Menu.Item key="2"><Link to="/burger-create">Crear Hamburguesa</Link></Menu.Item>
              <Menu.Item key="3"> <Link to="/login">Login</Link> </Menu.Item>
            </Menu>
          </Header>
          <Content className="site-layout" style={{ height:"100vh", padding: '0 50px', marginTop: 64 }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <div className="head" >
                <h1>
                  ¡Hola Burger Lover!
                </h1>
                <p>
                Te damos la bienvenida a BRGR.CLUB <br/>
                El lugar donde los burger lovers se encuentran para compartir su pasión. <br/>
                ¡COMER HAMBURGUESAS!
                </p>
             </div>
              
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {allburgers.map((burger, index)=>  {
              return(
                <>
                <Col className="gutter-row" span={6} key={index}>
                    <Card
                    
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={burger.picture}
                    />}
                    >
                    <Meta title={burger.burgername} description={burger.restaurantbyname} />
                    <Button type="primary" onClick={()=>showModal(burger)}>
                      Mostrar Info
                    </Button>
                    </Card>
                    
                </Col>
                
                </>
              )
            })
              }
             </Row>
            
            </div>
            <Modal title={burger?.burgername} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Tipo de Hamburguesa: {burger?.category}</p>
                <p>Precio: {burger?.price}</p>
                <p>La Carne: <Rate disabled value={burger?.meat} /></p>
                <p>El Pan: <Rate disabled value={burger?.bread} /></p>
                <p>El Queso: <Rate disabled value={burger?.cheese} /></p>
                <p>Los Toppings: <Rate disabled value={burger?.toppings} /></p>
                <p>Las Papas: <Rate disabled value={burger?.fries} /></p>
                <p>Restaurante: {burger?.restaurantbyname}</p>
                <p>Comentario: {burger?.comment}</p>
                <img className="modalpic" alt="example" src={burger?.picture}
                    />
                </Modal>
          </Content>
          <Footer style={{ textAlign: 'center' }}>BRGR.CLUB ©2021 Created by Víctor Hernández</Footer>
        </Layout>
      )
};
    

export default Home;