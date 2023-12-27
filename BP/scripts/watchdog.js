import { system } from "@minecraft/server"

system.beforeEvents.watchdogTerminate.subscribe((data) => {
   data.cancel = true
   console.warn(`Watchdog tried to crash - ${data.terminateReason}`)
})
