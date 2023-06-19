// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { TypeCollision } from "../CollisionTag";
import DamageSender from "../Damage/DamageSender";
import EnemyManager from "../EnemyManager";
import Enemy from "./Enemy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyDamageSender extends DamageSender {
    @property(Enemy)
    enemy: Enemy = null;

    start () {

    }

    // update (dt) {}

    onCollisionEnter(other: cc.Collider, self: cc.Collider): void {
        if(other.tag === TypeCollision.WEAPON_PLAYER) {
            this.handleStateDead();
        }
    }
    onCollisionStay(other: cc.Collider, self: cc.Collider): void {
        // console.log("onCollisionStay EnemyDamageSender");
    }
    onCollisionExit(other: cc.Collider, self: cc.Collider): void {
        // console.log("onCollisionExit EnemyDamageSender");
    }

    handleStateDead(): void {
        EnemyManager.instance.onDead(this.node.parent.getPosition());
        this.node.parent.destroy();
    }
}
