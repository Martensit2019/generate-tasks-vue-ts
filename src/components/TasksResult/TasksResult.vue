<template>
  <div class="tasks-result">
    <div v-if="tasks.length">
      <Button style="margin-bottom: 20px" @click="emit('create-task')"
        >Добавить новую задачу</Button
      >
      <div>
        <div style="display: flex">
          <Button color="danger" size="small" @click="emit('remove-groupe', selectedTaskIds)"
            >Удалить выделенные задачи</Button
          >
          <StatusFilter ref="refStatusFilter" />
        </div>
        <div style="overflow: scroll" :style="{height: props.resizeHeightTable ? `${props.resizeHeightTable - 140}px` : '340px'}">
        <TaskTable
          ref="refTaskTable"
          :tasks="filteredTasks"
          @update-task="(id: string) => emit('update-task', id)"
          @remove-groupe="(removedTaskIds: string[]) => emit('remove-groupe', removedTaskIds)"
        />
        </div>
      </div>
    </div>
    <div v-else>
      <h3 class="tasks-result__title">Задач нет</h3>
      <p>
        Но Вы можете сгенерировать задачи в окошке слева. Для этого в поле ввода введите количество
        задач, которые надо сгенерировать от 1 до 10.
      </p>
      <p>Или добавить задачу самостоятельно, нажав на кнопку ниже:</p>
      <div class="add-btn">
        <Button @click="emit('create-task')">Создать задачу</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ITask } from '../Tasks/interfaceTasks'

interface IProps {
  tasks: ITask[]
  resizeHeightTable: number | null
}
const props = defineProps<IProps>()

interface IEmits {
  (e: 'create-task'): void
  (e: 'update-task', id: string): void
  (e: 'remove-groupe', removedTaskIds: string[]): void
}

const emit = defineEmits<IEmits>()

const refStatusFilter = ref(null)
const refTaskTable = ref(null)

const currentStatus = computed(() => refStatusFilter.value?.activeStatus)
const selectedTaskIds = computed(() => refTaskTable.value?.selectedTaskIds)

const filteredTasks = computed(() => {
  if (currentStatus.value === 'all') return props.tasks
  if (currentStatus.value === 'active') return props.tasks.filter((task) => task.isActive)
  if (currentStatus.value === 'done') return props.tasks.filter((task) => !task.isActive)
})
</script>

<style scoped lang="scss">
.tasks-result {
  padding: 20px;
  &__title {
    margin-bottom: 20px;
  }
  &__input {
    margin-bottom: 20px;
  }
  .add-btn {
    margin-top: 20px;
  }
}
</style>
