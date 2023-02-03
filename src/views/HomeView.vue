<script lang="ts">
import countries from "./data.json";
import cities from "./cities.json";

function getRandomArbitrary(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
  computed: {
    hello() {
      let max = countries.map((x) => x.population).reduce((a, b) => a + b, 0);
      let cities_dice = getRandomArbitrary(0, max);
      let acc = 0;
      let res = {
        country: "",
        country_code: "",
        city: "",
        city_local: "",
        city_perc: "" as string | undefined,
        perc: "" as string | undefined,
        country_population: 0,
      };
      for (let item in countries) {
        if (
          cities_dice >= acc &&
          cities_dice < acc + countries[item].population
        ) {
          res.country = countries[item].country;
          res.country_code = countries[item].code;
          res.perc = ((countries[item].population / max) * 100)
            .toFixed(20)
            .match(/^-?\d*\.?0*\d{0,2}/)?.[0];
          res.country_population = countries[item].population;
          break;
        }
        acc += countries[item].population;
      }

      let big_cities_acc = 0;
      for (let index in cities) {
        if (cities[index].country_code == res.country_code) {
          if (
            cities_dice >= acc &&
            cities_dice < acc + cities[index].population
          ) {
            res.city = cities[index].ascii_name;
            res.city_local = cities[index].name;
            res.city_perc = (
              (cities[index].population / res.country_population) *
              100
            )
              .toFixed(20)
              .match(/^-?\d*\.?0*\d{0,2}/)?.[0];
            break;
          }
          big_cities_acc += cities[index].population;
          acc += cities[index].population;
        }
      }
      if (!res.city) {
        res.city_perc = (
          ((res.country_population - big_cities_acc) / res.country_population) *
          100
        )
          .toFixed(20)
          .match(/^-?\d*\.?0*\d{0,2}/)?.[0];
      }
      return res;
    },
  },
};
</script>

<template>
  <h1>Assuming you have been reborn</h1>
  <span>After a die roll you now live in</span>
  <br />
  <span style="font-size: 350%; background: inherit">{{ hello.country }}</span>
  <br />
  <span>With other {{ hello.perc }}% like you</span>
  <br />
  <span v-if="hello.city" style="font-size: 150%">
    Your new city: {{ hello.city }} ({{ hello.city_local }})
  </span>
  <span v-else style="font-size: 150%">
    You live in a city with less than 500 000 people
  </span>
  <br />
  <span> Like {{ hello.city_perc }}% in this city </span>
</template>
