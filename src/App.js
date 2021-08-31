import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import FragmentDoctor from './components/FragmentDoctor';
import FragmentMascota from './components/FragmentMascota';
import FragmentMascotaDoctor from "./components/FragmentMascotaDoctor";


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
            <FragmentDoctor></FragmentDoctor>
          </Route>
          <Route path="/mascotas">
            <FragmentMascota></FragmentMascota>
          </Route>
          <Route path="/doctor-mascota">
            <FragmentMascotaDoctor></FragmentMascotaDoctor>

          </Route>
        </Switch>
      </Router>
    </div>
  );
  
}


export default App;
