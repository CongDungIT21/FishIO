// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { TypeCollision } from "./CollisionTag";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Cutting extends cc.Component {

    private speed: number = 50;
    private time: number = 3;
    private threshold: number = 20;
    
    onCollisionEnter(other: cc.Collider, self: cc.Collider): void {
        console.log("onCollisionEnter");
        if(other.tag === TypeCollision.BODY_PLAYER || other.tag === TypeCollision.WEAPON_PLAYER)
            this.node.destroy();
    }

    update(dt) {
 
        if (this.time > 0) {
            const direction = cc.v2(0, -1).rotateSelf(this.node.angle * Math.PI / 180);
            const velocity = direction.mul(this.speed);
            const delta = velocity.mul(cc.director.getDeltaTime());
            const v3Delta = new cc.Vec3(delta.x, delta.y, 0);
            const newPos = this.node.position.add(v3Delta);
            this.node.setPosition(newPos);
            this.time -= dt;
        }
        else {
            this.node.destroy();
        }
    }
}
