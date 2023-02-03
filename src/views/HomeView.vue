<script lang="ts">
import countries from "./data.json";
import cities from "./cities.json";
import fer_rate from "./fer_rate.json";
import school from "./school_enrollment.json";
import VerticalSeparator from "@/views/VerticalSeparator.vue";

function getRandomArbitrary(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
  components: { VerticalSeparator },
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
        total_children: 1,
        school_participated: false,
        school_perc: "",
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

      let rate = fer_rate[res.country_code as keyof typeof fer_rate];
      if (rate) {
        let total_children = 0;
        for (let i = 0; i < 9; i++) {
          let siblings_dice = getRandomArbitrary(0, 1000);
          if (siblings_dice < (rate as number) * 100) {
            total_children += 1;
          }
        }
        res.total_children = total_children;
      }

      let school_exists = school[res.country_code as keyof typeof school];
      if (school_exists) {
        let school_dice = getRandomArbitrary(0, 100);
        let finished = school_dice <= school_exists;
        res.school_perc = (finished ? school_exists : (100 - school_exists))
          .toFixed(20)
          .match(/^-?\d*\.?0*\d{0,2}/)?.[0]!;
        res.school_participated = finished;
      } else {
        res.school_participated = false;
        res.school_perc = "0";
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
  <span>With other {{ hello.perc }}% of the entire population</span>

  <VerticalSeparator :size="50" />

  <span v-if="hello.city" style="font-size: 150%">
    Your new city: {{ hello.city }} ({{ hello.city_local }})
  </span>
  <span v-else style="font-size: 150%">
    You live in a city with less than 500 000 people
  </span>
  <br />
  <span> Like {{ hello.city_perc }}% in this country</span>
  <VerticalSeparator :size="100" />
  <span
    >You have
    {{ hello.total_children === 0 ? 0 : hello.total_children - 1 }} siblings in
    family
  </span>
  <VerticalSeparator :size="100" />
  <span v-if="hello.school_participated" style="font-size: 150%">
    You finished the school with the other {{ hello.school_perc }}% of the
    country population
  </span>
  <span v-else style="font-size: 150%">
    You didn't finish the school with the other
    {{ hello.school_perc }}% of the country population
  </span>
</template>
