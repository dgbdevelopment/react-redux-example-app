import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
} from "types/index";
import axios from "config/axios";
import Swal from "sweetalert2";

//FUNCIONES PARA AGREGAR PRODUCTOS
export function crearProducto(producto, history) {
  return async (dispatch) => {
    dispatch(agregarProducto());
    try {
      await axios.post("/productos", producto);
      dispatch(agregarProductoExito(producto));
      Swal.fire("Hecho", "El producto se agregó correctamente", "success");
      history.push("/");
    } catch (error) {
      dispatch(agregarProductoError(true));
      Swal.fire("Error", "Ha ocurrido un error", "error");
    }
  };
}
const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});
const agregarProductoError = (bool) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: bool,
});

//FUNCIONES PARA OBTENER LA LISTA DE PRODUCTOS
export function obtenerProductos() {
  return async (dispatch) => {
    dispatch(descargarProductos());
    try {
      const productos = await axios.get("/productos");
      dispatch(cargarProductosExito(productos.data));
    } catch (error) {
      console.log(error);
      dispatch(cargarProductosError(true));
      Swal.fire("Error", "Ha ocurrido un error", "error");
    }
  };
}
const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});
const cargarProductosExito = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});
const cargarProductosError = (bool) => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: bool,
});

// FUNCIONES PARA ELIMINAR PRODUCTOS
export function eliminarProducto(id) {
  return async (dispatch) => {
    try {
      await axios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito(id));
      Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
    } catch (error) {
      console.log(error);
      dispatch(eliminarProductoError(true));
      Swal.fire("Error", "Ha ocurrido un error", "error");
    }
  };
}
const eliminarProductoExito = (id) => ({
  type: PRODUCTO_ELIMINADO_EXITO,
  payload: id,
});
const eliminarProductoError = (bool) => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: bool,
});

//FUNCIONES PARA EDITAR UN PRODUCTO
export const obtenerEditarProducto = (producto) => {
  return (dispatch) => {
    dispatch(obtenerProducto(producto));
  };
};
const obtenerProducto = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});
export const editarProducto = (producto, history) => {
  return async (dispatch) => {
    try {
      await axios.put(`/productos/${producto.id}`, producto);
      dispatch(editarProductoExito(producto));
      Swal.fire("Hecho", "El producto se editó correctamente", "success");
      history.push("/");
    } catch (error) {
      console.log(error);
      dispatch(editarProductoError());
      Swal.fire("Error", "Ha ocurrido un error", "error");
    }
  };
};
const editarProductoExito = (producto) => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto,
});

const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR,
});
