<template>
    <h1>this user is {{ id }}</h1>

    <router-link v-bind:to="'/user/' + id + '/profile'">profile</router-link> | 
    <!-- <router-link v-bind:to="'/user/' + $route.params.id + '/proposts'">proposts</router-link> -->
    <router-link v-bind:to="'/user/' + id + '/proposts'">proposts</router-link>
    <router-view></router-view>
</template>


<script>
export default {
    name: "App",
    components: {},
    props: ["id"],  // 接收参数
    mounted() {
        console.log(this.id);
    }
}
</script>
