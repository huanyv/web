<template>
    <h1>About</h1>
    <h4>{{ count }}----{{ num }}</h4>

    <ol>
        <li v-for="todo in getTodos" :key="todo.index">
            {{ todo.text }}
        </li>
    </ol>

    <!-- <button @click="plus()">加1</button> -->
    <button @click="increment()">加1</button> <!-- mapActions -->
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
// import { INCREMENT } from '@/store/mutation-types'
export default {
    methods: {
        ...mapActions(['increment']), // 太妙了
        plus() {
            // 不怡在其它的组件直接去操作 store 中的 数据，
            // 而是选择去调用其中的  mutations  中的方法
            // this.$store.commit("increment",{n: 10})
            // this.$store.commit({type: "increment",n: 10})
            // this.$store.dispatch('increment') 
        }
    },
    computed: {
        ...mapState(['count','num']),
        ...mapGetters(['getTodos'])
    }
}
</script>

<style scoped>
ol{
    margin: 0;
    padding: 0;
}
</style>
