import React from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {useEffect, useState} from 'react';
import {Table,TableContainer, TableHead,TableCell,TableBody,TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit,Delete} from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton';

const baseUrl = "http://127.0.0.1:8000/api/doctores/";

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));

const FragmentDoctor = () => {
    const styles=useStyles();
  const [data,setData]=useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [doctorSeleccionado,setDoctorSeleccionado]=useState({
    nombre:'',
    apellidos:'',
    edad:'',
    telefono:'',

  })

  const handleChange=e=>{
    const {name,value}=e.target;
    setDoctorSeleccionado(prevenState=>({
      ...prevenState,
      [name]:value
    }))
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    })
  }

  const peticionPost=async()=>{
    await axios.post(baseUrl, doctorSeleccionado)
    .then(response=>{
      setData(data.concat(response.data))
      peticionGet()
      abrirCerrarModalInsertar()
    })
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+doctorSeleccionado.id, doctorSeleccionado)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(doctor=>{
        if(doctorSeleccionado.id===doctor.id){
          doctor.nombre=doctorSeleccionado.nombre;
          doctor.apellidos=doctorSeleccionado.apellidos;
          doctor.edad=doctorSeleccionado.edad;
          doctor.telefono=doctorSeleccionado.telefono;
        }
        return null;
      })
      setData(dataNueva);
      console.log(dataNueva);
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+doctorSeleccionado.id, doctorSeleccionado)
    .then(response=>{
      setData(data.filter(doctor=>doctor.id!==doctorSeleccionado.id));
      abrirCerrarModalEliminar();
    })
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar)
  }
  const abrirCerrarModalEditar=()=>(
    setModalEditar(!modalEditar)
  )
  const abrirCerrarModalEliminar=()=>(
    setModalEliminar(!modalEliminar)
  )

  const seleccionarDoctor=(doctor, caso)=>{
    setDoctorSeleccionado(doctor);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  useEffect(async()=>{
    await peticionGet();
  },[])
  
  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar nuevo doctor</h3>
      <br></br>
      <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange}>Nombre</TextField>
      <br></br>
      <TextField className={styles.inputMaterial} label="Apellidos" name="apellidos" onChange={handleChange}>Apellidos</TextField>
      <br></br>
      <TextField className={styles.inputMaterial} label="Edad" name="edad" onChange={handleChange} >Edad</TextField>
      <br></br>
      <TextField className={styles.inputMaterial} label="Telefono" name="telefono" onChange={handleChange}>Telefono</TextField>
      <br></br>
      
      <Button color="primary" onClick={()=>peticionPost()}>Agregar</Button>
      <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
    </div>
  )
  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar doctor</h3>
      <br></br>
      <TextField className={styles.inputMaterial} label="nombre" name="nombre" onChange={handleChange} value={doctorSeleccionado && doctorSeleccionado.nombre}>Nombre</TextField>
      <br></br>
      <TextField className={styles.inputMaterial} label="apellidos" name="apellidos" onChange={handleChange} value={doctorSeleccionado && doctorSeleccionado.apellidos}>Apellidos</TextField>
      <br></br>
      <TextField className={styles.inputMaterial} label="edad" name="edad" onChange={handleChange} value={doctorSeleccionado && doctorSeleccionado.edad}>Edad</TextField>
      <br></br>
      <TextField className={styles.inputMaterial} label="telefono" name="telefono" onChange={handleChange} value={doctorSeleccionado && doctorSeleccionado.telefono}>Telefono</TextField>
      <br></br>
      <br></br>
      <Button color="primary" onClick={peticionPut}>Editar</Button>
      <Button onClick={abrirCerrarModalEditar}>Cancelar</Button>
    </div>
  )
  const bodyEliminar=(
    <div className={styles.modal}>
      <h3>¿Seguro que desea eliminar al doctor?</h3>
      <p>Doctor:  {doctorSeleccionado && doctorSeleccionado.nombre} </p>
      <Button color="primary" onClick={()=>peticionDelete()}>Si</Button>
      <Button onClick={abrirCerrarModalEliminar}>No</Button>
    </div>
  )
    return (
        <div>
            
      
      
      <div className="contenedorTable">
      <div className="terms ">
          <h2>Doctores</h2>
      </div>
      
      
      <TableContainer>
        <Table>
          <TableHead className="colorHead">
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="colorTableBody">
            {
              data.map(doctor=>(
                <TableRow key={doctor.id}>
                  <TableCell>{doctor.nombre}</TableCell>
                  <TableCell >{doctor.apellidos}</TableCell>
                  <TableCell>{doctor.edad}</TableCell>
                  <TableCell>{doctor.telefono}</TableCell>
                  <TableCell>
                  <IconButton  onClick={()=>{seleccionarDoctor(doctor, 'Editar')}}>
                    <Edit className="colorBotonEditar" />
                  </IconButton>
                    &nbsp;&nbsp;&nbsp;
                    <IconButton  onClick={()=>{seleccionarDoctor(doctor,'Eliminar')}} >
                    <Delete className="colorBotonEliminar"/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }

          </TableBody>
        </Table>
        
      </TableContainer>
      <div className="botonaling">
        <br></br>
      <button className="btn btn-success" onClick={abrirCerrarModalInsertar}>Agregar nuevo doctor</button>
      </div>
      
      
      </div>
      

      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>
     <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>
      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
        </div>
    )
}

export default FragmentDoctor;