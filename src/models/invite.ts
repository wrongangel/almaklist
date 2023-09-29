export interface Invite {
  id: string
  from: string
  list: {
    id: string,
    name: string
  }
  email: string
}