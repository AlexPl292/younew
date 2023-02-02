<script lang="ts">
import json from "./data.json";

function getRandomArbitrary(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
  data() {
    return {
      count: json,
    };
  },
  computed: {
    hello() {
      let max = json.map((x) => x.population).reduce((a, b) => a + b, 0);
      let newPlace = getRandomArbitrary(0, max);
      let acc = 0;
      let res;
      for (let item in json) {
        if (newPlace >= acc && newPlace < acc + json[item].population) {
          res = json[item].country;
          break;
        }
        acc += json[item].population;
      }
      return res;
    },
  },
};
</script>

<template>You are now: {{ hello }}</template>
