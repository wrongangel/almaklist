export interface Invite {
  id: string
  from: string
  list: {
    id: string,
    name: string
  } | null
  email: string
}