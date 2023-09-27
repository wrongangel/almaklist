import Item from './item'

export default interface Collection {
  created_at: string
  id: string
  name: string
  items?: Item[]
}