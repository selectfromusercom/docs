// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
// import MyLayout from './MyLayout.vue'

import './tailwind.postcss'

export default {
  extends: DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  // Layout: MyLayout
}