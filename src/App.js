import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Fragment_Doctor from './components/Fragment_Doctor';
import Fragment_Mascota from './components/Fragment_Mascota';


function App() {
  return (
    <div className="App">
      <Router>
        <div className="btn-group botonesnav">
              <NavLink to="/doctores" className="btn btn-dark">Doctores</NavLink>
              <NavLink to="/mascotas" className="btn btn-dark">Mascotas</NavLink>
              <NavLink to="/doctor-mascota" className="btn btn-dark">Doctores - Mascotas</NavLink>
        </div>
        <Switch>
        <Route path="/doctores">
            <Fragment_Doctor></Fragment_Doctor>
          </Route>
          <Route path="/mascotas">
            <Fragment_Mascota></Fragment_Mascota>
          </Route>
          <Route path="/doctor-mascota">

          </Route>
        </Switch>
      </Router>
    </div>
  );
  
}


export default App;
