<script setup lang="ts">
import { ref } from "vue";
import {
  useObserverable,
  useRecoilState,
  useSubscription,
} from "../hooks";
import { fakeStore$ } from "../utils/store/store";

import NewComp from "./NewComp.vue";

defineProps<{ msg: string }>();

const [value, source$] = useObserverable<number>(1);

const [atomValue, atomSource$] = useRecoilState(fakeStore$);

const count = ref(0);

useSubscription(source$, (e) => {
  console.log(e);
  count.value += 1;
});

function handleClick(): void {
  source$.next(source$.value + 1);
}
</script>

<template>
  useObserverable:
  {{ value }}
  <br />
  <button @click="handleClick">Inc</button>
  <br />
  useSubscription:
  {{ count }}

  <br/>
  <button @click="atomSource$.next(atomValue + 1)">update atom</button>
  <br />

  <NewComp />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
