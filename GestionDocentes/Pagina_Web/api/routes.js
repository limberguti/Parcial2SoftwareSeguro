import express from 'express';
import { db } from "./db.js";

import bcrypt from 'bcrypt';


const routes=express.Router();
// Método para iniciar sesión (login)
routes.get('/loginmysql', async (req, res) => {
  const { nombreus, contraseniaus } = req.query; // Datos enviados desde el cliente para el inicio de sesión

  // Verifica que se hayan proporcionado tanto el nombre de usuario como la contraseña
  if (!nombreus || !contraseniaus) {
    return res.status(400).json({ error: 'Nombre de usuario y contraseña son obligatorios' });
  }

  req.getConnection((err, conn) => {
    if (err) {
      console.error('Error en la conexión a la base de datos:', err);
      return res.status(500).json({ error: 'Error en el servidor. Inténtalo de nuevo más tarde.' });
    }

    // Busca el usuario en la base de datos por su nombre de usuario
    conn.query('SELECT * FROM usuario WHERE nombreus LIKE ?', [nombreus], (err, rows) => {
      if (err) {
        console.error('Error en la consulta a la base de datos:', err);
        return res.status(500).json({ error: 'Error en el servidor. Inténtalo de nuevo más tarde.' });
      }

      if (rows.length === 0 || rows[0].contraseniaus !== contraseniaus) {
        return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos' });
      }

      // Si las credenciales son válidas, envía un mensaje de éxito
      res.json({ message: 'Ingreso correctamente', usuario: nombreus });
    });
  });
});

// Método GET para buscar un personal por sus apellidos
routes.get('/docente', (req, res) => {
  const { search } = req.query;

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT * FROM docente WHERE APELLIDOS LIKE ?', [`%${search}%`], (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

// Método POST para agregar nuevo personal
routes.post('/docente', (req, res) => {
  const newDocente = req.body; // Datos enviados desde el cliente
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('INSERT INTO docente SET ?', [newDocente], (err, rows) => {
      if (err) return res.send(err);
      res.send('Docente agregado');
    });
  });
});

// Método UPDATE para actualizar a un personal por su cedula
  routes.put('/docente/:iddocente', (req, res) => {
    const iddocente = req.params.iddocente; // Corrección aquí
    const updatedPersonal = req.body; // Datos enviados desde el cliente para la actualización

    req.getConnection((err, conn) => {
      if (err) return res.send(err);

      conn.query('UPDATE docente SET ? WHERE IDDOCENTE = ?', [updatedPersonal, iddocente], (err, result) => {
        if (err) return res.send(err);

        // Verificar si se actualizó algún registro
        if (result.affectedRows === 0) {
          return res.status(404).send('Docente no encontrado'); // Si no se encontró el personal con el ID dado
        }

        res.send('Docente actualizado correctamente');
      });
    });
  });




// Método GET para obtener el IDDOCENTE por cédula
routes.get('/docentes/id/:cedula', (req, res) => {
  const cedula = req.params.cedula;

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT IDDOCENTE FROM docente WHERE CEDULA = ?', [cedula], (err, rows) => {
      if (err) return res.send(err);

      if (rows.length > 0) {
        res.json({ idDocente: rows[0].IDDOCENTE });
      } else {
        res.status(404).json({ message: 'Docente no encontrado' });
      }
    });
  });
});
// Método GET para obtener todos los datos de la tabla docente
routes.get('/docentesg', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT * FROM docente', (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});
// Obtener detalles de docente por ID
routes.get('/docentesc/:idDocente', (req, res) => {
  const idDocente = req.params.idDocente;

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT * FROM docente WHERE IDDOCENTE = ?', [idDocente], (err, rows) => {
      if (err) return res.send(err);
      res.json(rows[0]); // Si se espera un único resultado
    });
  });
});

// Método GET para obtener los datos  de la tabla docente y mostrar en el select
routes.get('/docentes', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT IDDOCENTE,APELLIDOS,NOMBRES, CEDULA FROM docente', (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});


// CRUD Requerimiento

// Método GET para obtener todos los datos de la tabla docente
routes.get('/requerimientosg', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT * FROM requerimiento', (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

// Método GET para obtener los datos  de la tabla docente y mostrar en el select
routes.get('/requerimientos', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT IDREQUERIMIENTO,SEDE,DEPARTAMENTO,DENOMINACION,DEDICACION FROM requerimiento', (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});
// Método GET para buscar un cargo por su id
routes.get('/cargo', (req, res) => {
  const { search } = req.query;

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT * FROM cargo WHERE TIPOPERSONAL LIKE ? ', [`%${search}%`], (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});
// Método GET para obtener los datos de requerimiento relacionados con un contrato específico
routes.get('/requerimientosc/:idRequerimiento', (req, res) => {
  const idRequerimiento = req.params.idRequerimiento;

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT * FROM requerimiento WHERE IDREQUERIMIENTO = ?', [idRequerimiento], (err, rows) => {
      if (err) return res.send(err);
      res.json(rows); // Devuelve directamente el arreglo de objetos
    });
  });
});

// Método GET para buscar un instituto por el nombre del departamento
routes.get('/requerimiento', (req, res) => {
  const { search } = req.query;

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT * FROM requerimiento WHERE DEPARTAMENTO LIKE ?', [`%${search}%`], (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

// Método POST para agregar nuevo requerimiento
routes.post('/requerimiento', (req, res) => {
  const newRequerimiento = req.body; // Datos enviados desde el cliente
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('INSERT INTO requerimiento SET ?', [newRequerimiento], (err, rows) => {
      if (err) return res.send(err);
      res.send('Requerimiento agregado');
    });
  });
});

// Método UPDATE para actualizar un requrimiento por su cedula
routes.put('/requerimiento/:idrequerimiento', (req, res) => {
  const idrequerimiento = req.params.idrequerimiento; // Corrección aquí
  const updatedReq = req.body; // Datos enviados desde el cliente para la actualización

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('UPDATE requerimiento SET ? WHERE IDREQUERIMIENTO = ?', [updatedReq, idrequerimiento], (err, result) => {
      if (err) return res.send(err);

      // Verificar si se actualizó algún registro
      if (result.affectedRows === 0) {
        return res.status(404).send('Requerimiento no encontrado'); // Si no se encontró el personal con el ID dado
      }

      res.send('Requerimiento actualizado correctamente');
    });
  });
});

// Método DELETE para eliminar un instituto por su ID
/*routes.delete('/instituto/:id', (req, res) => {
  const institutoId = req.params.id; // Obtener el ID del instituto a eliminar

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('DELETE FROM instituto WHERE IDINSTITUTO = ?', [institutoId], (err, result) => {
      if (err) return res.send(err);

      // Verificar si se eliminó algún registro
      if (result.affectedRows === 0) {
        return res.status(404).send('Instituto no encontrado');
      }

      res.send('Instituto eliminado correctamente');
    });
  });
});*/

//CRUD TIEMPO
// Método POST para agregar nuevo tiempo
routes.post('/tiempo', (req, res) => {
  const newTiempo = req.body; // Datos enviados desde el cliente
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('INSERT INTO tiempo SET ?', [newTiempo], (err, rows) => {
      if (err) return res.send(err);
      res.send('Tiempo agregado');
    });
  });
});
// Método GET para obtener los datos de idtiempo utilizando el IDTIEMPO como parámetro
routes.get('/tiemposc/:idTiempo', (req, res) => {
  const idTiempo = req.params.idTiempo;

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT * FROM tiempo WHERE IDTIEMPO = ?', [idTiempo], (err, rows) => {
      if (err) return res.send(err);
      res.json(rows); // Devuelve directamente el arreglo de objetos
    });
  });
});

// Método UPDATE para actualizar un tiempo por su codigo
routes.put('/tiempo/:idtiempo', (req, res) => {
  const IDTIEMPO = req.params.idtiempo; 
  const updatedTiempo = req.body; // Datos enviados desde el cliente para la actualización

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('UPDATE tiempo SET ? WHERE IDTIEMPO = ?', [updatedTiempo, IDTIEMPO], (err, result) => {
      if (err) return res.send(err);

      // Verificar si se actualizó algún registro
      if (result.affectedRows === 0) {
        return res.status(404).send('Tiempo no encontrado');
      }

      res.send('Tiempo actualizado correctamente');
    });
  });
});
// Método GET para obtener datos de la tabla tiempo y mostrar en el select
routes.get('/tiempos', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT IDTIEMPO, CODIGO,HORAS,DESCRIPCION FROM tiempo', (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

// Método GET para obtener todos los datos de la tabla tiempos
routes.get('/tiemposg', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT * FROM tiempo', (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

// Método GET para buscar un tiempo por su CODIGO, DESCRIPCION, IDTIEMPO o HORAS
routes.get('/tiempo', (req, res) => {
  const { search } = req.query;

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const query = `
      SELECT * 
      FROM tiempo 
      WHERE IDTIEMPO LIKE ? 
        OR DESCRIPCION LIKE ? 
        OR CODIGO LIKE ? 
        OR HORAS LIKE ?
    `;

    conn.query(query, [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`], (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

//CRUD CARGO
// Método POST para agregar nuevo CARGO
routes.post('/cargo', (req, res) => {
  const newCargo = req.body; // Datos enviados desde el cliente
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('INSERT INTO cargo SET ?', [newCargo], (err, rows) => {
      if (err) return res.send(err);
      res.send('Cargo agregado');
    });
  });
});

// Método GET para obtener los datos de requerimiento relacionados con un contrato específico
routes.get('/cargosc/:idCargo', (req, res) => {
  const idCargo = req.params.idCargo;

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT * FROM cargo WHERE IDCARGO = ?', [idCargo], (err, rows) => {
      if (err) return res.send(err);
      res.json(rows); // Devuelve directamente el arreglo de objetos
    });
  });
});

// Método GET para obtener los datos de la tabla cargo y mostrarlos en el select
routes.get('/cargos', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT IDCARGO, TIPOPERSONAL,CATEGORIA,NIVEL,GRADO,REMUNERACION FROM cargo', (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

// Método GET para obtener todos los datos de la tabla cargo
routes.get('/cargog', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT * FROM cargo', (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

// Método UPDATE para actualizar un cargo por su id
routes.put('/cargo/:idcargo', (req, res) => {
  const IDCARGO = req.params.idcargo; // Obtener el ID del instituto a actualizar
  const updatedCargo = req.body; // Datos enviados desde el cliente para la actualización

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('UPDATE cargo SET ? WHERE IDCARGO = ?', [updatedCargo, IDCARGO], (err, result) => {
      if (err) return res.send(err);

      // Verificar si se actualizó algún registro
      if (result.affectedRows === 0) {
        return res.status(404).send('Cargo no encontrado');
      }

      res.send('Cargo actualizado correctamente');
    });
  });
});

// Método GET para buscar un cargo por su id
routes.get('/cargo', (req, res) => {
  const { search } = req.query;

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT * FROM cargo WHERE TIPOPERSONAL LIKE ? ', [`%${search}%`], (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});


//CRUD CONTRATO
// Método POST para agregar nuevo CONTRATO
routes.post('/contrato', (req, res) => {
  const newContrato = req.body; // Datos enviados desde el cliente
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('INSERT INTO contrato SET ?', [newContrato], (err, rows) => {
      if (err) return res.send(err);
      res.send('Contrato agregado');
    });
  });
});



// Método GET para obtener todos los datos de la tabla contrato
routes.get('/contratosg', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT * FROM contrato', (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

// Método GET para buscar un contrato por su id
routes.get('/contrato', (req, res) => {
  const { search } = req.query;

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query('SELECT * FROM contrato WHERE IDCONTRATO LIKE ?', [`%${search}%`], (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});


export default routes;