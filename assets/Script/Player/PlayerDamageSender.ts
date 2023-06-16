// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DamageSender from "../Damage/DamageSender";
import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerDamageSender extends DamageSender {
    @property(Player)
    player: Player = null;

    start () {

    }

    // update (dt) {}

    onCollisionEnter(other: cc.Collider, self: cc.Collider): void {
        // console.log("onCollisionEnter PlayerDamageSender");
    }
    onCollisionStay(other: cc.Collider, self: cc.Collider): void {
        // console.log("onCollisionStay PlayerDamageSender");
    }
    onCollisionExit(other: cc.Collider, self: cc.Collider): void {
        // console.log("onCollisionExit PlayerDamageSender");
    }
}
