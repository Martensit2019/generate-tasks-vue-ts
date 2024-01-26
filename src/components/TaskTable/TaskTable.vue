<template>
  <table class="table">
    <thead class="table__header">
      <th class="table__checkbox">
        <input type="checkbox" v-model="isSelectedAllTasks" @click="select" />
      </th>
      <th v-for="header in headers" :style="{ width: header.width }" :key="header.code">
        {{ header.title }}
      </th>
    </thead>
    <tbody>
      <tr v-for="task in tasks" :key="task.id">
        <td class="center">
          <input type="checkbox" :value="task.id" v-model="selectedTaskIds" />
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
  tasks?: ITask[]
}
const props = defineProps<IProps>()

interface IEmits {
  (e: 'update-task', id: string): void
  (e: 'remove-groupe', removedTaskIds: string[]): void
}

const emit = defineEmits<IEmits>()

const isSelectedAllTasks = ref<boolean>(false)
const selectedTaskIds = ref([])

const headers: IHeader[] = tableHeaders

const select = () => {
  selectedTaskIds.value = []
  if (!isSelectedAllTasks.value) {
    for (let i in props.tasks) {
      selectedTaskIds.value.push(props.tasks[i].id)
    }
  }
}
defineExpose({
  selectedTaskIds
})
</script>

<style scoped lang="scss">
@import 'taskTable';
</style>
