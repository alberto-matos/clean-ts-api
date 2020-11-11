import paths from './paths-def'
import components from './components-def'
import schemas from './schema-def'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean API - by Alberto Matos',
    description: `Projeto destinado ao aprendizado de: \n
      * nodeJs \n
      * TypeScript \n      * 
      * Clean architecture \n
      * SOLID \n
      * TDD `,
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [{
    url: '/api',
    description: 'Prefixo padrão para todas as APIs'
  }],
  tags: [
    { name: 'Login' },
    { name: 'Enquete' }
  ],
  paths,
  schemas,
  components
}
