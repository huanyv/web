<template>
  <h2>home</h2>

  <ul>
    <li v-for="article in articles" :key="article.url">
      <router-link :to="article.url"> {{ article.name }} </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      articles: [
        {
          url: "/archives/1",
          name: "文章1",
        },
        {
          url: "/archives/2",
          name: "文章2",
        },
        {
          url: "/archives/3",
          name: "文章3",
        },
      ],
    };
  },
};
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style-type: none;
}
a {
  text-decoration: none;
}
</style>
