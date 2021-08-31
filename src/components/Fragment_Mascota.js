import React from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {useEffect, useState} from 'react';
import {Table,TableContainer, TableHead,TableCell,TableBody,TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit,Delete} from '@material-ui/icons';

const baseUrl = "http://127.0.0.1:8000/api/animales/";


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

  const Fragment_Mascota = () => {
    const styles=useStyles();
  const [data,setData]=useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [animalSeleccionado,setAnimalSeleccionado]=useState({
    nombre:'',
    nombre_dueno:'',
    id_tipo_animal:'',
    tipo:''
  })

  const handleChange=e=>{
    const {name,value}=e.target;
    setAnimalSeleccionado(prevenState=>({
      ...prevenState,
      [name]:value
    }))
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
      console.log(response.data);
    })
  }

  const peticionPost=async()=>{
    await axios.post(baseUrl, animalSeleccionado)
    .then(response=>{
      setData(data.concat(response.data))
      peticionGet()
      abrirCerrarModalInsertar()
    })
  }

  const peticionPut=async()=>{
    
    await axios.put(baseUrl+animalSeleccionado.id, animalSeleccionado)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(animal=>{
        if(animalSeleccionado.id===animal.id){
            animal.nombre=animalSeleccionado.nombre;
            animal.nombre_dueno=animalSeleccionado.nombre_dueno;
            animal.id_tipo_animal=animalSeleccionado.id_tipo_animal;
        }
      })
      setData(dataNueva);
      peticionGet()      
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+animalSeleccionado.id, animalSeleccionado)
    .then(response=>{
      setData(data.filter(animal=>animal.id!==animalSeleccionado.id));
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

  const seleccionarAnimal=(animal, caso)=>{
    setAnimalSeleccionado(animal);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  useEffect(async()=>{
    await peticionGet();
  },[])

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar nuevo Mascota</h3>
      <br></br>
      <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange}>Nombre de la mascota</TextField>
      <br></br>
      <TextField className={styles.inputMaterial} label="nombre_dueno" name="nombre_dueno" onChange={handleChange}>Nombre del dueño</TextField>
      <br></br>
      <TextField className={styles.inputMaterial} label="id_tipo_animal" name="id_tipo_animal" onChange={handleChange} >Tipo de animal</TextField>
      <br></br>
      
      <Button color="primary" onClick={()=>peticionPost()}>Agregar</Button>
      <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
    </div>
  )
  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Mascota</h3>
      <br></br>
      <TextField className={styles.inputMaterial} label="nombre" name="nombre" onChange={handleChange} value={animalSeleccionado && animalSeleccionado.nombre}>Nombre</TextField>
      <br></br>
      <TextField className={styles.inputMaterial} label="nombre_dueno" name="nombre_dueno" onChange={handleChange} value={animalSeleccionado && animalSeleccionado.nombre_dueno}>Nombre del dueño de la mascota</TextField>
      <br></br>
      <TextField className={styles.inputMaterial} label="id_tipo_animal" name="id_tipo_animal" onChange={handleChange} value={animalSeleccionado && animalSeleccionado.id_tipo_animal}>Tipo mascota</TextField>
      <br></br>
      <br></br>
      <Button color="primary" onClick={peticionPut}>Editar</Button>
      <Button onClick={abrirCerrarModalEditar}>Cancelar</Button>
    </div>
  )
  const bodyEliminar=(
    <div className={styles.modal}>
      <h3>¿Seguro que desea eliminar a la mascota?</h3>
      <p>Mascota:  {animalSeleccionado && animalSeleccionado.nombre} </p>
      <Button color="primary" onClick={()=>peticionDelete()}>Si</Button>
      <Button onClick={abrirCerrarModalEliminar}>No</Button>
    </div>
  )
  
    return (
        <div>
            
      
      
      <div className="contenedorTable">
      <div className="terms ">
          <h2>Mascotas</h2>
      </div>
      
      
      <TableContainer>
        <Table>
          <TableHead className="colorHead">
            <TableRow>
              <TableCell>Nombre de la mascota</TableCell>
              <TableCell>Nombre del dueño</TableCell>
              <TableCell>Tipo de animal</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="colorTableBody">
            {
              data.map(animal=>(
                <TableRow key={animal.id}>
                  <TableCell>{animal.nombre}</TableCell>
                  <TableCell >{animal.nombre_dueno}</TableCell>
                  <TableCell>{animal.tipo}</TableCell>
                  <TableCell>
                    <Edit className="{styles.iconos} colorBotonEditar" onClick={()=>seleccionarAnimal(animal, 'Editar')} ></Edit>
                    &nbsp;&nbsp;&nbsp;
                    <Delete className="{styles.iconos} colorBotonEliminar" onClick={()=>seleccionarAnimal(animal,'Eliminar')}></Delete>
                  </TableCell>
                </TableRow>
              ))
            }

          </TableBody>
        </Table>
        
      </TableContainer>
      <div className="botonaling">
        <br></br>
      <button className="btn btn-success" onClick={abrirCerrarModalInsertar} >Agregar nueva mascota</button>
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

export default Fragment_Mascota;