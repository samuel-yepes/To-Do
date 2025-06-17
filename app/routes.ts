import Crear, { action as crearTareaAction } from './routes/crear';
import Ver, { loader as verTareaLoader } from './routes/ver.$id';
import Home, { loader as homeLoader, action as eliminarTareaAction } from './routes/index';

export default [
  {
    path: "/",
    file: "routes/index.tsx",
  },
  {
    path: "/crear",
    file: "routes/crear.tsx",
  },
  {
    path: "/ver/:id",
    file: "routes/ver.$id.tsx",
  },
  {
    path: "/editar/:id",
    file: "routes/editar.$id.tsx",
  },
];
