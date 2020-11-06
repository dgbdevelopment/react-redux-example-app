import { crearProducto } from "actions/productoActions";
import { mostrarAlertaAction } from "actions/alertaActions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const NuevoProducto = ({history}) => {
  const dispatch = useDispatch();
  const agregarProducto = (producto) => dispatch(crearProducto(producto, history));

  const { loading } = useSelector((state) => state.productos);
  const { alerta } = useSelector((state) => state.alerta);

  const [producto, setProducto] = useState({
    nombre: "",
    precio: 0,
  });

  const { nombre, precio } = producto;

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === "" || precio <= 0){
      const alerta = {
        msg: "Todos los campos son obligatorios",
        clases: 'alert alert-danger text-center p3 font-weight-bold mt-4'
      }
      return dispatch(mostrarAlertaAction(alerta));
    }
    dispatch(mostrarAlertaAction(null))
    agregarProducto(producto);
    setProducto({ nombre: "", precio: 0 });
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar nuevo producto
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre producto </label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  placeholder="Nombre producto"
                  value={nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="precio">Precio producto </label>
                <input
                  type="number"
                  name="precio"
                  className="form-control"
                  placeholder="Precio producto"
                  value={Number(precio)}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-block btn-primary font-weight-bold text-uppercase d-block"
              >
                Agregar producto +
              </button>
              {loading ? <p className="text-center">Cargando...</p> : null}
              {alerta ? (
                <p className={alerta.clases}>
                  {alerta.msg}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
