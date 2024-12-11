<template>
  <StaffContainer
      :position="Position.nurse"
      :label="PositionLabel[Position.nurse]"
  />
</template>

<script setup lang="ts">
import { Position, PositionLabel } from "../constants/positions.ts";
import StaffContainer from "../components/StaffContainer.vue";
</script>