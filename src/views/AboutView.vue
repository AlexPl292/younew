<script lang="ts">
import sources from "../data/sources.json";

export default {
  data() {
    return {
      sources: sources,
    };
  },
};
</script>
<template>
  <h1>Sources</h1>
  <span v-for="item in sources" :key="item.url">
    <a :href="item.url">{{ item.desc }}, license {{ item.license }}</a>
    <br />
  </span>
  <br />
  <h1>Disclaimer</h1>
  <span>This data is not proven and may be outdated</span>
  <br />
  <span>Please don't use it for anything except entertainment</span>
  <div style="margin-top: 20px">
    <a href="/">back</a>
  </div>
</template>
