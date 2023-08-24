import Usuarios from '../src/controllers'
import request from 'supertest'
import app from '../src/app'

const objUsuarios = new Usuarios()

describe('API usuarios', () => {
  test('palabra formatea', () => {
    expect(objUsuarios.convertirCamelCase('Juan')).toBe('Juan')
    expect(objUsuarios.convertirCamelCase('JuAn')).toBe('Juan')
    expect(objUsuarios.convertirCamelCase('juan')).toBe('Juan')
  })

  test('GET usuarios funciona', async () => {
    const respuesta = await request(app)
      .get('/api/usuarios')

    expect(respuesta.statusCode).toBe(200)
    expect(respuesta.body).toBeDefined()
    expect(typeof respuesta.body).toBe('object')
  })

  // test que verifica si el registro de ususario retorna un codigo 201
  // si todo sale bien
  test('POST usuarios funciona', async () => {
    const respuesta = await request(app) // Hace una peticion al servidor
      .post('/api/crearUsuario') // Hace una peticion POST a la ruta /api/crearUsuario
      .send({ // Envia el siguiente objeto
        usuario: {
          nombresUsuario: 'Juan',
          correoUsuario: 'juan@gmai.com'
        }
      })
    expect(respuesta.statusCode).toBe(201) // Comprueba que el servidor responda con un codigo 201
  })

  // test que verifica si el registro de ususario retorna un codigo 400
  // cuando se envia mal el usuario
  test('POST usuarios falla', async () => {
    const respuesta = await request(app) // Hace una peticion al servidor
      .post('/api/crearUsuario') // Hace una peticion POST a la ruta /api/crearUsuario
      .send({ // Envia el siguiente objeto
        usuario: {
          nombresUsuario: '',
          correoUsuario: ''
        }
      })
    expect(respuesta.statusCode).toBe(400) // Comprueba que el servidor responda con un codigo 400
  })
})
