<template>
  <div class="input__group">
    <label v-if="label" class="label">{{ label }}</label>
    <input
      class="input"
      :type="type"
      :value="modelValue"
      min="1"
      max="10"
      :placeholder="placeholder"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
type TType = 'text' | 'number'
interface IProps {
  type?: TType
  modelValue?: string
  placeholder?: string
  label?: string
}

withDefaults(defineProps<IProps>(), {
  type: 'text',
  placeholder: '',
  label: ''
})

interface IEmits {
  (e: 'update:modelValue', value: string): void
}

const emit = defineEmits<IEmits>()

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<style scoped lang="scss">
@import './input';
</style>
