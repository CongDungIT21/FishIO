// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class DamageReceive extends cc.Component {
    abstract onCollisionEnter(other: cc.Collider, self: cc.Collider): void;
    abstract onCollisionStay(other: cc.Collider, self: cc.Collider): void;
    abstract onCollisionExit(other: cc.Collider, self: cc.Collider): void;
    abstract isDead(): boolean;
    abstract handleStateDead(): void;
}
