import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'

// element ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// markdown显示
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// vue press样式
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// Prism
import Prism from 'prismjs';
// 代码高亮
import 'prismjs/components/prism-json';
// 选择使用主题
VMdPreview.use(vuepressTheme, {
  Prism,
});

// 显示代码行数
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
VMdPreview.use(createLineNumbertPlugin());

// 快速复制代码
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
VMdPreview.use(createCopyCodePlugin());

let app = createApp(App)
app.use(ElementPlus)
app.use(router)

app.use(VMdPreview);

app.mount('#app')
