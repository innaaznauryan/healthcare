<template>
  <StaffContainer
      :position="Position.doctor"
      :label="PositionLabel[Position.doctor]"
  />
</template>

<script setup lang="ts">
import { Position, PositionLabel } from "../constants/positions.ts";
import StaffContainer from "../components/StaffContainer.vue";
</script>