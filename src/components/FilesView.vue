<template>
    <el-container v-loading="isLoading" class="browser">
        <el-empty description="No file" v-if="files.length == 0"/>

        <el-col>
            <el-row v-for="item in files">
                <a @click="navi(item)" class="list">
                    <div class="button">
                        <el-icon class="icon">
                            <FolderOpened v-if="item.type == 'dir'" />
                            <Document v-if="item.type == 'file'" />
                        </el-icon>
                        {{ item.name.replace('/', '') }}
                        <span class="ripple"></span>
                    </div>
                </a>
            </el-row>
        </el-col>
    </el-container>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { toolset, config } from '../tools'
import { useRouter } from 'vue-router';
import { Document, FolderOpened } from '@element-plus/icons-vue'
import { slice } from 'lodash';

const props = defineProps({
    route: String
})

const isLoading = ref(false);
const files = ref({})
const router = useRouter()

const reloadFileList = () => {
    isLoading.value = true;

    // Todo: list files and render the list
    toolset.axios.post("list", {
        prefix: props.route
    }).then((res) => {
        files.value = res.data.files;
        isLoading.value = false;
        // console.log(files.value)
    }).catch((e) => {
        console.log(e)
        isLoading.value = false;
    })
}

const navi = (item) => {
    if (item.type == "dir") {
        router.push(item.name)
    } else {
        // window.location.href = config.r2fix + props.route + item.name
        router.push({
            path: '/preview',
            query: {file: props.route + item.name}
        })
        // window.open(config.r2fix + props.route + item.name, "_blank")
    }
}

watch(() => props.route, (pre, post) => reloadFileList());
onMounted(() => reloadFileList());

</script>

<style>
.browser {
    min-height: 60vh;
}

.list {
    width: 100%;

    margin-top: 8px;
    opacity: 1;
}

/* .button {
    width: 100%;
    height: 35px;
    
    margin-left: 10px;
    display: flex;
    align-items: center;
} */

.icon {
    margin-right: 6px;
}

.button {
    position: relative;
    width: 100%;
    display: inline-block;
    height: 35px;

    display: flex;
    align-items: center;
    padding-left: 10px;

    border: 1px solid var(--el-border-color);
    border-radius: 10px;

    background-color: #F0F2F5;
    /* color: #fff; */
    cursor: pointer;
}

.ripple {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: inherit;
    opacity: 0;
    transform: scale(0);
    transform-origin: left;
    transition: transform 0.3s, opacity 0.3s;
}

.button:hover .ripple {
    opacity: 1;
    transform: scale(1);
}
</style>