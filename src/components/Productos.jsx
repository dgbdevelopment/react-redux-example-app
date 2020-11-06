import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerProductos } from "actions/productoActions";
import Producto from "components/Producto";

const Productos = () => {
  const dispatch = useDispatch();

  const { productos, loading, error } = useSelector((state) => state.productos);
  
  useEffect(() => {
    if (productos.length >0) return
    const cargarProductos = () => dispatch(obtenerProductos());
    cargarProductos();
    //eslint-disable-next-line
  }, [productos]);


  return (
    <>
      <h2 className="text-center my-5">Listado de productos</h2>
      {loading ? <p className="text-center my-4">Cargando...</p> : null}
      {error ? <p className="alert alert-danger text-center my-4">Error cargando la lista de productos</p> : null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col" className="w-25">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos?.length >= 0 ? (
            productos.map((producto) => <Producto producto={producto} key={producto.id} />)
          ) : (
            <p className="text-center">No hay productos</p>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Productos;
