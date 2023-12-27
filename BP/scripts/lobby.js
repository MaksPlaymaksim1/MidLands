import {
  world,
  system,
  ItemLockMode,
  ItemStack
} from "@minecraft/server"

world.afterEvents.playerSpawn.subscribe((event) => {
  const {
    player
  } = event
  if (event.initialSpawn === true) {
    player.addTag("lobby")
  }
})

system.runInterval(() => {
  const playersInWorld = world.getAllPlayers()
  for (const player of playersInWorld) {
    if (player.hasTag("lobby")) {
      const teleporterCompass = new ItemStack("minecraft:compass", 1)
      const socialShell = new ItemStack("minecraft:nautilus_shell", 1)

      teleporterCompass.lockMode = ItemLockMode.inventory
      teleporterCompass.lockMode = ItemLockMode.slot
      teleporterCompass.nameTag = "§r§l§aTeleporter§r"
      socialShell.lockMode = ItemLockMode.inventory
      socialShell.lockMode = ItemLockMode.slot
      socialShell.nameTag = "§r§l§5Social Menu§r"

      const inventory = player.getComponent("inventory")
      inventory.container.setItem(1, teleporterCompass)
    }
  }
}, 10)