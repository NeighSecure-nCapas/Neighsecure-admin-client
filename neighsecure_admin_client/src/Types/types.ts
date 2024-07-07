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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Home = {
  id?: string
  homeNumber?: number
  address?: string
  admin?: User | null
  users?: User[]
  membersNumber?: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type HomeResponse = {
  id: string
  homeNumber: number
  address?: string
  homeBoss: User | null
  members: User[]
  membersNumber: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DashboardData = {
  totalResidents: number,
  totalVisitorsToday: number,
  totalHomes: number,
  entries: Entry[],
}

type Entry = {
  id: string
  user: User | null
  date: Date
  home: HomeData | null
  entryType: string
}

type HomeData = {
  id: string
  homeNumber: number
  homeBoss: string
}

type Entries = {
  id: string
  date: string
  entryType: string
  user: string | null
  homeNumber: string | null
  comment: string | null
}
