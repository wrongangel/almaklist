export default interface Item {
  id: string
  created_at: string
  completed: boolean
  added_by: string
  quantity: number
  user_data: {
    id: string;
    user_name: string | null
  } | null
  item_type: {
    item_name: string
  } | null
  quantity_type: {
    shortName: string
  } | null
}
