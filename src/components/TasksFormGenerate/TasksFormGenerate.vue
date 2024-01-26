<template>
  <div class="tasks-form-generate">
    <form @submit.prevent="generate">
      <div>
        <div class="tasks-form-generate__title">Здесь можно сгенерировать задачи (1-10)</div>
        <div class="tasks-form-generate__input">
          <Input type="number" v-model="quantity" placeholder="Введите количество задач" />
        </div>
        <div>
          <Button :isDisabled="!isDisabled" is-full>Сгенерировать</Button>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
interface IEmits {
  (e: 'generate', quantity: string): void
}

const emit = defineEmits<IEmits>()

const quantity = ref<string>()
const isDisabled = computed(() => Boolean(quantity.value))
const generate = () => {
  emit('generate', quantity.value)
  quantity.value = null

}
</script>

<style scoped lang="scss">
.tasks-form-generate {
  padding: 20px;
  &__title {
    font-size: 14px;
    margin-bottom: 20px;
  }
  &__input {
    margin-bottom: 20px;
  }
}
</style>
