export interface Bonus {
  id: number | string
  tdsCode?: string
  operationDate?: string // ISO string from API
  bonusPoint?: number
  totalPrice?: number
}