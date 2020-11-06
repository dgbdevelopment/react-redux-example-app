import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { editarProducto } from "actions/productoActions";
import { mostrarAlertaAction } from "actions/alertaActions";
import { useHistory } from "react-router-dom";

const EditarProducto = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [producto, setProducto] = useState({
    id: "",
    nombre: "",
    precio: 0,
  });
  const { nombre, precio } = producto;

  const { productoEditar } = useSelector((state) => state.productos);
  const { alerta } = useSelector((state) => state.alerta);

  useEffect(() => {
    if (!productoEditar) return;
    setProducto(productoEditar);
  }, [productoEditar]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === "" || precio <= 0){
      const alerta = {
        msg: "Todos los campos son obligatorios",
        clases: "alert alert-danger text-center p3 font-weight-bold mt-4",
      };
      return dispatch(mostrarAlertaAction(alerta))
    }
    dispatch(mostrarAlertaAction(null));
    dispatch(editarProducto(producto, history));
    setProducto({ nombre: "", precio: 0 });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar producto
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
                Guardar cambios
              </button>
              {alerta ? <p className={alerta.clases}>{alerta.msg}</p> : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
