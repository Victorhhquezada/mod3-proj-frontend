import {
    Row,
    Col,
    Typography,
    Form,
    Button,
    Menu,
    Layout
} from 'antd'


import {ItemForm} from '../../components'
import {loginWS,signupWS} from '../../services/auth-endpoint'
import { useContext } from 'react';
import {Link} from "react-router-dom"
import {Ctx} from '../../hooks/context'
const {Title} = Typography
const { Header, Content, Footer } = Layout;

function Auth ({match,history,location,...restProps}){ 
   
    const {login} = useContext(Ctx)
    const handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    const handleSubmit = async (user) => {
        try{
            const camino = match.path === "/signup" ? signupWS : loginWS
            const {data} = await camino(user)
            if(match.path === "/auth" ){
                login(data.result)
            }
            history.push("/")
            console.log("data -> ",data)
        }catch(error){
            console.log("Error -> ",error.response)
        }
    }
    return (
    <Layout styles={{height:"90vh"} }>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1"> <Link to="/">Inicio</Link> </Menu.Item>
            <Menu.Item key="2"><Link to="/burger-create">Crear Hamburguesa</Link></Menu.Item>
            <Menu.Item key="3"> <Link to="/login">Login</Link> </Menu.Item>
          </Menu>
        </Header>
        <Content className="site-layout" style={{ height:"100vh", padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>

          <Row gutter={[16,16]}>
            <Col span={24}>
                <Title>{match.path === "/signup" ? "Signup" : "Login"}</Title>
                <Form onFinish={handleSubmit}>
                    
                    
                    <ItemForm name="username"  label="Username"/>
                    {match.path === "/signup" &&
                    <ItemForm onChange={handleChange} name="email"  label="Email"/>}
                    <ItemForm onChange={handleChange} name="password"  label="Password"/>
                    <span> {`${
                         match.path !== '/signup' ? "¿Aun no" : '¿Ya'
                     } tienes cuenta? |`}
                         <Link to={match.path !== "/signup" ? "/signup" :"/login" }>Dale aqui</Link>
                     </span>

                    {}

                    <Button type='primary' block htmlType='submit'>
                        {match.path === "/signup" ? "Signup" : "Login"}
                    </Button>
                </Form>
            </Col>
        </Row>

          </div>
          
        </Content>
        <Footer style={{ textAlign: 'center' }}>BRGR.CLUB ©2021 Created by Víctor Hernández</Footer>
      </Layout>
        
    )
}

export default Auth;