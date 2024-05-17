import type { App } from 'vue'
import MsButton from './MsButton.vue'

// 使用install方法，在app.use挂载
MsButton.install = (app: App) => {
  app.component(MsButton.__name as string, MsButton)
}

export default MsButton
