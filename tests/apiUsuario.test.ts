import Usuarios from '../src/controllers'

const objUsuarios = new Usuarios()

describe('API usuarios', () => {
  test('palabra formatea', () => {
    expect(objUsuarios.convertirCamelCase('juan')).toMatch(/Juan/)
  })
})
