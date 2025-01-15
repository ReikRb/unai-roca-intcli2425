import { Duration } from "./Duration"
import { SecondaryEffect } from "./SecondaryEffect"

export interface Effect {
    attribute: string,
    value: number,
    duration: Duration

}