// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { TypeCollision } from "../CollisionTag";
import DamageReceive from "../Damage/DamageReceive";
import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerDamageReceive extends DamageReceive {
    @property(Player)
    player: Player = null;

    start () {

    }

    // update (dt) {}

    onCollisionEnter(other: cc.Collider, self: cc.Collider): void {
        // console.log("onCollisionEnter PlayerDamageReceive");
        if(other.tag === TypeCollision.WEAPON_ENEMY) {
            // this.node.parent.destroy();
            this.handleStateDead();
        }
    }
    onCollisionStay(other: cc.Collider, self: cc.Collider): void {
        // console.log("onCollisionEnter PlayerDamageReceive");
    }
    onCollisionExit(other: cc.Collider, self: cc.Collider): void {
        // console.log("onCollisionEnter PlayerDamageReceive");
    }
    isDead(): boolean {
        // console.log("isDead");
        return true;
    }
    handleStateDead(): void {
        this.node.parent.destroy();
    }
}
