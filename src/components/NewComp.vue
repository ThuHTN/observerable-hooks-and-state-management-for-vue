<script setup lang="ts">
import { useRecoilState } from "../hooks";
import { fakeSelector, fakeStore$ } from "../utils/store/store";

const [value, source$] = useRecoilState(fakeStore$);

const [selectorValue, selectorSource$] = useRecoilState(fakeSelector);
</script>
<template>
  New State: {{ value }} <br />
  selector value: {{ selectorValue }}
</template>
