import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import {
  eliminarProducto,
  obtenerEditarProducto,
} from "actions/productoActions";
import Swal from 'sweetalert2';

const Producto = ({ producto }) => {
  
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then( (result) => {
      if (result.isConfirmed) {
        dispatch(eliminarProducto(id));
      }
    });
  }

  const handleEditClick = (producto) => {
    dispatch(obtenerEditarProducto(producto));
    history.push(`/productos/editar/${producto.id}`);
  }

  return (
    <tr>
      <th scope="row">{producto.nombre}</th>
      <td>{producto.precio} €</td>
      <td className="d-flex justify-content-around">
        <button
          type="button"
          className="btn btn-dark"
          onClick={()=>handleEditClick(producto)}
        >
          Editar ✏️
        </button>
        <button className="btn btn-danger" onClick={()=>handleDeleteClick(producto.id)}>Eliminar 🗑️</button>
      </td>
    </tr>
  );
}
 
export default Producto;