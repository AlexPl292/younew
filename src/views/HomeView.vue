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
      let res = {};
      for (let item in json) {
        if (newPlace >= acc && newPlace < acc + json[item].population) {
          res.country = json[item].country;
          res.perc = ((json[item].population / max) * 100)
            .toFixed(20)
            .match(/^-?\d*\.?0*\d{0,2}/)[0];
          break;
        }
        acc += json[item].population;
      }
      return res;
    },
  },
};
</script>

<template>
  <h1>Assuming you have been reborn</h1>
  <span>After a die roll you now live in</span>
    <br>
  <span style="font-size: 350%; background: inherit;">{{ hello.country }}</span>
    <br>
  <span>With other {{ hello.perc }}% like you</span>
</template>
