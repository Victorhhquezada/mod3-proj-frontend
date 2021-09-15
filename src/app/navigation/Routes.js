import { Switch, Route } from "react-router-dom";
import {Auth, Home, BurgerCreator} from '../views'


const Router = () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Auth}/>
        <Route exact path="/signup" component={Auth}/>
        <Route exact path="/burger-create" component={BurgerCreator}/>
        <Route exact path="/burger/:id" component={()=><h1>Here you see a burger review</h1>}/>
        <Route exact path="/restaurant/:id" component={()=><h1>Here you create a burger</h1>}/>
    </Switch>
)

export default Router;