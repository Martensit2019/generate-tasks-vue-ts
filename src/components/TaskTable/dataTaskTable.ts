import { type IHeader } from './interfaceTaskTable'

export const tableHeaders: IHeader[] = [
  {
    code: 'task',
    title: 'Задача',
    width: '150px'
  },
  {
    code: 'description',
    title: 'Описание',
    width: 'auto'
  },
  {
    code: 'status',
    title: 'Статус',
    width: '100px'
  },
  {
    code: 'actions',
    title: 'Действия',
    width: '100px'
  }
]
