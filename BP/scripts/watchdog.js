import { system } from "@minecraft/server"

system.events.beforeWatchdogTerminate.subscribe((data) => {
   data.cancel = true
   console.warn(`Watchdog tried to crash - ${data.terminateReason}`)
})
