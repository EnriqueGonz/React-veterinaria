import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Table,TableContainer, TableHead,TableCell,TableBody,TableRow} from '@material-ui/core';

const baseUrl = "http://127.0.0.1:8000/api/asignacion/";

const FragmentMascotaDoctor = () => {
  const [data,setData]=useState([]);

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    })
  }
  useEffect(async()=>{
    await peticionGet();
  },[])


    return (
      <div>
      <div className="contenedorTable">
      <br></br>
      <TableContainer>
        <Table>
          <TableHead className="colorHead">
            <TableRow>
              <TableCell>Mascota</TableCell>
              <TableCell>Atendida por el doctor:</TableCell>
            </TableRow>
          </TableHead>
        <TableBody className="colorTableBody">
            {
              data.map(asignacion=>(
                <TableRow key={asignacion.id}>
                  <TableCell>{asignacion.nombre_mascota}</TableCell>
                  <TableCell >{asignacion.nombre_doctor +' '+ asignacion.apellidos_doctor}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      
      </div>
    </div>
    )
}

export default FragmentMascotaDoctor;