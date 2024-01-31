<template>
  <table class="table">
    <thead class="table__header">
      <th v-if="true" class="table__checkbox" style="width: 40px;">
        <Checkbox
          id="checkbox"
          v-model="isSelectedAllTasks"
          @update:model-value="emit('select-all', isSelectedAllTasks)"
        />
      </th>
      <th v-for="header in headers" :style="{ width: header.width }" :key="header.code">
        {{ header.title }}
      </th>
    </thead>
    <tbody>
      <tr v-for="task in tasks" :key="task.id">
        <td v-if="true" class="center">
          <Checkbox
            id="checkbox"
            v-model="task.checked"
            @update:model-value="emit('select-task', task)"
          />
        </td>
        <td>
          <div>{{ task.name }}</div>
        </td>
        <td>{{ task.descr }}</td>
        <td class="center">
          <div class="status" :style="{ background: task.isActive ? 'red' : 'green' }"></div>
        </td>
        <td class="center">
          <IconSprite
            :id="`${task.id}_update`"
            :height="18"
            name="edit"
            class="btn-action"
            @click="emit('update-task', task.id)"
          />
          <IconSprite
            :id="`${task.id}_remove`"
            :height="18"
            name="trash"
            class="btn-action red"
            @click="emit('remove-groupe', [task.id])"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { type ITask } from '../Tasks/interfaceTasks'
import { type IHeader } from './interfaceTaskTable'
import { tableHeaders } from './dataTaskTable'

interface IProps {
  tasks: ITask[]
}
const props = defineProps<IProps>()

interface IEmits {
  (e: 'update-task', id: string): void
  (e: 'remove-groupe', removedTaskIds: string[]): void
  (e: 'select-all', isSelectedAllTasks: boolean): void
  (e: 'select-task', task: ITask): void
}

const emit = defineEmits<IEmits>()

const isSelectedAllTasks = ref<boolean>(props.tasks.every((task) => task.checked))
const selectedTaskIds = computed(() =>
  props.tasks.filter((task) => task.checked).map((task) => task.id)
)

const headers: IHeader[] = tableHeaders

defineExpose({
  selectedTaskIds
})
</script>

<style scoped lang="scss">
@import 'taskTable';
</style>
