export interface Invite {
  id: string
  user_data: {
    user_name: string
  }
  list: {
    id: string,
    name: string
  }
  email: string
}