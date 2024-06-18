type User = {
  id?: string
  name: string
  email?: string
  roles: Role[]
  homeId?: string
  dui: string
  assignedTerminal?: string | null
}

type Role = {
    rolId: string
    rol: string
}

type Home = {
  id?: string
  homeNumber?: number
  address?: string
  admin?: User | null
  users?: User[]
  membersNumber?: number
}

type Entries = {
  id: string
  date: string
  entryType: string
  user: string | null
  homeNumber: string | null
  comment: string | null
}
