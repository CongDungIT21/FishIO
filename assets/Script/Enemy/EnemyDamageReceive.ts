// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { TypeCollision } from "../CollisionTag";
import DamageReceive from "../Damage/DamageReceive";
import Enemy from "./Enemy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyDamageReceive extends DamageReceive {
    @property(Enemy)
    enemy: Enemy = null;

    start () {

    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider): void {
        // console.log("onCollisionEnter EnemyDamageReceive");
        if(other.tag === TypeCollision.WEAPON_PLAYER) {
            // this.node.parent.destroy();
            this.handleStateDead();
        }
    }
    onCollisionStay(other: cc.Collider, self: cc.Collider): void {
        // console.log("onCollisionEnter EnemyDamageReceive");
    }
    onCollisionExit(other: cc.Collider, self: cc.Collider): void {
        // console.log("onCollisionEnter EnemyDamageReceive");
    }

    isDead(): boolean {
        console.log("isDead");
        return true;
    }
    handleStateDead(): void {
        this.node.parent.destroy();
    }
}
