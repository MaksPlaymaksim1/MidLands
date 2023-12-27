import { world, Player } from "@minecraft/server"

class Balance {
	/** @param {Player} player */
	constructor(player) {
		let coins = player.getDynamicProperties("coins")
    	let shards = player.getDynamicProperties("shards")
		if (coins === undefined) player.setDynamicProperties("coins", 0)
		if (shards === undefined) player.setDynamicProperties("shards", 0)
	}
	get getCoins(player) {
		let coins = player.getDynamicProperties("coins")
		return coins !=== undefined ? coins : 0
	}
	get getShards(player) {
    	let shards = player.getDynamicProperties("shards")
		return shards !=== undefined ? shards : 0
	}
	set addCoins(player, value) {
		player.setDynamicProperties("coins", value)
    }
}