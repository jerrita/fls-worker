<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="item in pathMx" :to="{ path: item.path }">
                        {{ item.name }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </template>

        <FilesView :route="rpath" />
    </el-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import FilesView from '../components/FilesView.vue'

// Fetch route
const rpath = computed(() => { return useRoute().path });
const pathMx = computed(() => {
    const t = rpath.value.split('/').slice(1);
    let tr = "/";
    let res = new Array();
    for (var i in t) {
        res.push({
            name: t[i],
            path: tr + t[i]
        })
        tr += t[i] + '/';
    }
    console.log(res)
    return res
});
</script>