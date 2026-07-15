import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  prettier,
  {
    rules: {
      // Pages and views are legitimately single-word (Home, About, Settings).
      // Left on, this rule fails `npm run lint` on a freshly scaffolded project.
      'vue/multi-word-component-names': 'off',
    },
  },
  { ignores: ['node_modules', 'dist', '.nuxt', '.output'] },
]
