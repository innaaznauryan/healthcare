<template>
  <StaffTable
      :staff="staff"
      @open-edit-modal="openEditModal"
      @open-delete-modal="openDeleteModal"
  />
  <Modal
      title="Update Staff Member"
      :show="isModalOpen"
      @close="closeModal"
  >
    <StaffForm
        v-if="selectedStaffMember"
        :selected-staff-member="selectedStaffMember"
        :is-edit-mode="true"
        @close="closeModal"
        @afterLeave="clearSelectedStaffMember"
        @submit-form="submitForm"
    />
  </Modal>
  <Modal
      :show="isDeleteModalOpen"
      title="Are you sure you want to delete this Staff Member?"
      @close="closeDeleteModal"
      @afterLeave="clearSelectedStaffMember"
  >
    <ConfirmDelete
        v-if="selectedStaffMember"
        :selected-staff-member="selectedStaffMember"
        @close="closeDeleteModal"
        @confirm="deleteStaffMember"
    />
  </Modal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from 'vuex';
import { StaffMemberSchema } from '../types/staff.ts';
import StaffTable from "./StaffTable.vue";
import StaffForm from "./StaffForm.vue";
import ConfirmDelete from "../components/ConfirmDelete.vue";
import Modal from "../components/Modal.vue";

const props = defineProps({
  departmentId: {
    type: Number,
    required: true
  }
})

const store = useStore();
const staff = computed(() => store.state.staff
    .filter((staffMember: StaffMemberSchema) => staffMember.departmentId === props.departmentId)
    .sort((a: StaffMemberSchema, b: StaffMemberSchema) => (b.isHead ? 1 : 0) - (a.isHead ? 1 : 0)));

const isModalOpen = ref<boolean>(false);
const isDeleteModalOpen = ref<boolean>(false);
const selectedStaffMember = ref<StaffMemberSchema | null>(null);

const closeModal = () => {
  isModalOpen.value = false;
};
const openEditModal = (staffMember: StaffMemberSchema) => {
  selectedStaffMember.value = staffMember;
  isModalOpen.value = true;
}
const openDeleteModal = (staffMember: StaffMemberSchema) => {
  selectedStaffMember.value = staffMember;
  isDeleteModalOpen.value = true;
};
const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
}
const clearSelectedStaffMember = () => {
  selectedStaffMember.value = null;
}

const submitForm = (staffMember: StaffMemberSchema) => {
  updateStaffMember(staffMember);
  closeModal();
};

const updateStaffMember = (updatedStaffMember: StaffMemberSchema) => {
  store.dispatch('updateStaffMember', updatedStaffMember);
};
const deleteStaffMember = () => {
  if (selectedStaffMember.value && selectedStaffMember.value.id) {
    store.dispatch('deleteStaffMember', selectedStaffMember.value.id);
  }
  closeDeleteModal();
};
</script>