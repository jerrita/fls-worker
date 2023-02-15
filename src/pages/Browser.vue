<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <div class="fb">
                    <el-button class="fb-btn" @click="router.back">
                        Back
                    </el-button>
                    <span>{{ fileName }}</span>
                    <el-link :href="fileHref" class="fb-raw">
                        raw
                    </el-link>
                </div>
            </div>
        </template>

        <div v-if="codeTypes.includes(fileType)" v-loading="isLoading">
            <highlightjs :language="fileType" :code="someCode"/>
        </div>
        <div v-else-if="mediaTypes.includes(fileType)">
            <vue3-video-player :src="fileHref"></vue3-video-player>
        </div>
        <div v-else>
            Unsupport preview type!
        </div>
    </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { config, toolset } from '../tools';

const router = useRouter()
const filePath = useRoute().query.file
const fileName = filePath.split('/').pop()
const fileType = fileName.split('.').pop()
const fileHref = config.r2fix + filePath
const someCode = ref('')
let isLoading = true
const codeTypes = [
    'cpp',
    'c',
    'python',
    'bash',
    'java',
    'go',
    'javascript',
]
const mediaTypes = [
    'mp4',
    'mkv',
    'avi',
]

console.log(filePath)
console.log(fileHref)

// Get Code
if (codeTypes.includes(fileType)) {
    toolset.axios.get(fileHref)
    .then((res) => {
        console.log(res)
        someCode.value = res.data
        isLoading = false;
    })
    .catch((e) => {
        someCode.value = "Fail to load code"
        isLoading = false;
    })
}

</script>

<style>
.fb {
    display: flex;
    justify-content: center;
    align-items: center;
}

.fb-btn {
    margin-right: auto;
}

.fb-raw {
    margin-left: auto;
}

</style>