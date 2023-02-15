import { createApp } from 'vue'
// import './style.css'
import axios from 'axios';
import App from './App.vue'
import defaultRouter from './router/main'

// import 'highlight.js/styles/stackoverflow-light.css';
// import 'highlight.js/styles/github.css'
import 'highlight.js/styles/intellij-light.css'
import hljsCommon from 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import Vue3VideoPlayer from '@cloudgeek/vue3-video-player'
import '@cloudgeek/vue3-video-player/dist/vue3-video-player.css'

const app = createApp(App)

// 注意：解决 Vue 使用 highlight.js build 打包发布后样式消失问题
// 原因是 webpack 在打包的时候没有把未被使用的代码打包进去，因此，在此处引用一下，看似无意义实则有用
hljsCommon.highlightAuto('<h1>Highlight.js has been registered successfully!</h1>').value
app.use(defaultRouter).use(hljsVuePlugin).use(Vue3VideoPlayer, {
    lang: 'zh-CN'
}).mount('#app')
