import { nanoid } from 'nanoid'

export const newId = (prefix = 'id') => {
  return `${prefix}_${nanoid(8)}`
}