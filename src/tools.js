import axios from 'axios'

const debug = false

const config = {
    prefix: debug ? "http://127.0.0.1:8788/" : "https://fls.ka5umi.eu.org/",
    r2fix: "https://pub-1f1c790c7e3347059d6c24f5b758d5f6.r2.dev"
}

const toolset = {
    axios: axios.create({
        baseURL: config.prefix + "api",
    }),
}

export {
    toolset, config
}