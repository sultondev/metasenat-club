<template>
  <Transition name="modal-open">
    <div class="modal fixed top-0 w-auto h-auto z-[1000]" v-if="isModalOpen">
      <div class="modal__backdrop bg-[#00000080]  w-full h-screen w-screen flex justify-center items-center"
           @click.self="$emit('close-modal')">
        <div class="modal__container bg-white rounded-[12px]">
          <slot>Default</slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">

defineProps<{
  isModalOpen: boolean
}>()
</script>

<style>

.modal__backdrop {
  transition: opacity 0.3s ease;
}

.modal-open-enter-active {
  transition: opacity 0.6s ease-out;
}

.modal-open-leave-active {
  transition: opacity 0.6s ease-out;
}


.modal-open-enter-from .modal__container {
  transform: scale(0.6);
  opacity: 0;
}

.modal-open-leave-to .modal__container {
  transform: scale(1.2);
  opacity: 0;
}

.modal-open-enter-from .modal__backdrop,
.modal-open-leave-to .modal__backdrop {
  opacity: 0;
}


.modal-open-enter-to .modal__container, .modal-open-leave-from .modal__container {
  transform: scale(1);
  opacity: 1;
}

.modal-open-enter-to .modal__backdrop, .modal-open-leave-from .modal__backdrop {
  opacity: 1;
}

.modal__container {
  transition: all 0.3s ease;
}


</style>