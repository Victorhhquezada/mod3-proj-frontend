import { Switch, Route } from "react-router-dom";
import {Auth} from '../views'


const Router = () => (
    <Switch>
        <Route exact path="/" component={()=><h1>Home</h1>}/>
        <Route exact path="/auth" component={Auth}/>
        <Route exact path="/signup" component={Auth}/>

    </Switch>
)

export default Router;