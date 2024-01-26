import { ref } from 'vue'
import { generateTasks } from '@/helpers/generateTasks'
import { type ITask } from './interfaceTasks'

export const tasks = ref<ITask[]>([])
export const curTask = ref<ITask>()
export const isVisibleAddTask = ref<boolean>(false)
export const isVisibleChangeTask = ref<boolean>(false)

// 1. Генерация задач
export const onGenerate = (quantity: string) => {
  tasks.value = generateTasks(Number(quantity))
}
// 2. Добавление новой задачи
export const addTask = (task: ITask) => {
  // if()
  tasks.value.push(task)
  isVisibleAddTask.value = false
}
// 3. Удаление группы задач
export const removeGroupe = (ids: string[]) => {
  tasks.value = tasks.value.filter((task) => !ids.includes(task.id))
}
// 4. Обновление задачи
export const updateTask = (id: string) => {
  curTask.value = tasks.value.filter((task) => task.id === id)[0]
  isVisibleChangeTask.value = true
}
// 5. Изменение задач
export const toChangeTask = (curTask: ITask, action: string) => {
  if (action === 'remove') {
    tasks.value = tasks.value.filter((task) => curTask.id !== task.id)
  } else {
    const curIdx = tasks.value.findIndex((task) => curTask.id === task.id)
    tasks.value[curIdx] = curTask
  }
  isVisibleChangeTask.value = false
}
