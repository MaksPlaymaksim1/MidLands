import * as mc from "@minecraft/server"

declare module "@minecraft/server" {
  interface Player {
    currentCoins_c: number,
    currentShards_c: number
  }
}