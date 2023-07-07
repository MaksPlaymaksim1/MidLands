import { system, world, Player, Vector } from "@minecraft/server";

world.beforeEvents.itemUse.subscribe(async events => {
  const { itemStack, source } = events
  if (itemStack.typeId == "minecraft:feather" && itemStack.nameTag == "§r§aLeap") {
    if (!(source instanceof Player)) return

    const vector = Vector.add(Vector.multiply(source.getViewDirection(), 1.5), source.getVelocity())

    system.run(() => {
      source.applyKnockback(vector.x, vector.z, Math.hypot(vector.x, vector.z) * 2.3, vector.y < 0.3 ? 0.5 * vector.y : vector.y)
      source.runCommandAsync("clear @s feather 0 1")
    })
  }
})
