import pool from '../conexion'

// importacion de interfaces
import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { Usuario } from '../types'

export default class Usuarios {
  convertirCamelCase = (palabra: string):string => {
    // Convertir a camelCase
    const palabraCamelCase: string = palabra[0].toUpperCase() + palabra.slice(1).toLowerCase()
    return palabraCamelCase
  }

  private manejoErrorConsulta (res:Response, error?:unknown):Response {
    console.log(error)
    // devuelve un codigo http 500 y un json con el mensaje de que ocurrió un error
    return res.status(500).json({ mensaje: 'Ocurrió un error, por favor intentalo de nuevo.' })
  }

  // Busca el usuario por su id
  private async buscarUsuario (req: Request): Promise<Usuario[] | undefined | null> {
    // Obtiene el id del usuario de los parametros de la peticion
    const { idUsuario } = req.params
    // Intenta realizar la consulta
    try {
      // Realiza la consulta
      const resultadoUsuario: QueryResult = await pool.query('SELECT * FROM usuarios WHERE idUsuario = ?', [idUsuario])
      // Si no hay resultados retornara null
      if (!resultadoUsuario.rowCount) return null
      // Mapea los resultados de la consulta a un arreglo de objetos
      const usuario: Usuario[] = resultadoUsuario.rows.map(registro => {
        const usuario: Usuario = {
          idUsuario: registro.idUsuario,
          nombresUsuario: registro.nombres,
          correoUsuario: registro.correo
        }
        return usuario
      })
      // Retorna el resultado de la consulta
      return usuario
    } catch (error) {
      // Si hay un error en la consulta, lanza un error
      throw new Error('Error consultando el usuario')
    }
  }

  // POST /usuarios
  // Crear un nuevo usuario
  public async crearUsuario (req: Request, res: Response): Promise<Response> {
  // Obtener el usuario del cuerpo de la solicitud
    const { usuario }: { usuario: Usuario } = req.body

    if (!usuario.nombresUsuario || !usuario.correoUsuario) return res.status(400).json({ mensaje: 'El usuario no tiene los campos necesarios' })

    try {
    // Insertar el nuevo usuario en la base de datos
      await pool.query(
        'INSERT INTO usuarios (nombres, correo) VALUES ($1, $2)',
        [usuario.nombresUsuario, usuario.correoUsuario]
      )

      // Devolver una respuesta con estado 201 (creado) y finalizar la respuesta
      return res.status(201).end()
    } catch (error) {
    // Manejar cualquier error de consulta y devolver un mensaje de error
      return this.manejoErrorConsulta(res, error)
    }
  }

  public async traerUsuarios (_req: Request, res: Response): Promise<Response> {
    try {
      // Obtener todos los usuarios de la base de datos
      const rawUsers: QueryResult = await pool.query('SELECT * FROM usuarios')

      // Devolver una respuesta con estado 200 (éxito) y enviar los registros de usuarios en el cuerpo de la respuesta
      return res.status(200).json({ resultados: rawUsers.rows })
    } catch (error) {
      // Manejar cualquier error de consulta y devolver una respuesta adecuada
      return this.manejoErrorConsulta(res, error)
    }
  }

  public async traerUsuarioId (req:Request, res:Response):Promise<Response> {
    try {
      const resultadoUsuario = await this.buscarUsuario(req) // Llama al método "buscarUsuario" para obtener el resultado de la búsqueda

      // Si no se encuentra el usuario, devuelve un código de estado 404 con un mensaje de error
      if (resultadoUsuario === null || resultadoUsuario === undefined) return res.status(404).json({ mensaje: 'El usuario no existe' })

      // Si se encuentra el usuario, devuelve un código de estado 200 y el resultado del usuario
      return res.status(200).json({ resultado: resultadoUsuario })
    } catch (error) {
      console.log(error)
      // Si ocurre un error durante la búsqueda, devuelve un código de estado 500 con un mensaje de error
      return this.manejoErrorConsulta(res, error)
    }
  }

  public async editarUsuario (req: Request, res: Response): Promise < Response > {
    const resultadoUsuario = await this.buscarUsuario(req) // Llama al método "buscarUsuario" para obtener el resultado de la búsqueda

    // Si no se encuentra el usuario, devuelve un código de estado 404 con un mensaje de error
    if (resultadoUsuario === null || resultadoUsuario === undefined) return res.status(404).json({ mensaje: 'El usuario no existe' })

    // Obtiene el objeto "usuario" del cuerpo de la solicitud
    const { usuario }: { usuario: Usuario } = req.body
    try {
      // Realiza la consulta para actualizar la información del usuario en la base de datos
      const resultadoEditarUsuario: QueryResult = await pool.query('UPDATE usuarios SET nombres=$1, correo=$2 WHERE idusuario=$3', [usuario.nombresUsuario, usuario.correoUsuario, req.params.idUsuario])

      // Si no se afecta ninguna fila en la base de datos, llama al método "manejoErrorConsulta" con un mensaje de error
      if (!resultadoEditarUsuario.rowCount) this.manejoErrorConsulta(res, 'Error editando')

      // Devuelve un código de estado 200 para indicar que la edición del usuario fue exitosa
      return res.status(200).end()
    } catch (error) {
      // Si ocurre un error durante el proceso, devuelve un código de estado 500 con un mensaje de error
      return this.manejoErrorConsulta(res, error)
    }
  }

  public async eliminarUsuario (req:Request, res:Response):Promise<Response> {
    const { idUsuario } = req.params // Obtiene el parámetro "idUsuario" de la solicitud

    try {
      const resultadoUsuario = await this.buscarUsuario(req) // Llama al método "buscarUsuario" para obtener el resultado de la búsqueda

      // Si no se encuentra el usuario, devuelve un código de estado 404 con un mensaje de error
      if (resultadoUsuario === null || resultadoUsuario === undefined) return res.status(404).json({ mensaje: 'El usuario no existe' })

      // Realiza la consulta para eliminar el usuario de la base de datos utilizando el ID
      const resultadoEliminar = await pool.query('DELETE FROM usuarios WHERE idUsuario = $1', [parseInt(idUsuario)])

      // Si no se afecta ninguna fila en la base de datos, llama al método "manejoErrorConsulta" con un mensaje de error
      if (!resultadoEliminar.rowCount) return this.manejoErrorConsulta(res, 'Error eliminando el usuario')

      // Devuelve un código de estado 200 para indicar que la eliminación del usuario fue exitosa
      return res.status(200).end()
    } catch (error) {
      // Si ocurre un error durante el proceso, devuelve un código de estado 500 con un mensaje de error
      return this.manejoErrorConsulta(res, error)
    }
  }
}
