import { Effect } from "./Effect"
import { SecondaryEffect } from "./SecondaryEffect"

export interface Effects {
    primary: Effect
    secondary: SecondaryEffect[]
}