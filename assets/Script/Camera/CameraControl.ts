// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ConvertExtension from "../ConvertExtension";
import Player from "../Player/Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraControl extends cc.Component {
    @property(cc.Node)
    playerControl: cc.Node = null;
    @property(cc.Node)
    playerBoost: cc.Node = null;
    @property(Player)
    player: Player = null;

    private screen: cc.Vec2 = new cc.Vec2(cc.view.getVisibleSize().width, cc.view.getVisibleSize().height);    
    private cameraClampHorizontal: cc.Vec2 = new cc.Vec2(-0.5, 0.5).mul((1920-960));
    private cameraClampVertical: cc.Vec2 = new cc.Vec2(-0.5, 0.5).mul((1080-640));
    private playerControlClampHorizontal: cc.Vec2 = new cc.Vec2(-0.5, 0.5).mul(100);
    private playerControlClampVertical: cc.Vec2 = new cc.Vec2(-0.5, 0.5).mul(100);

    protected onLoad(): void {
        this.playerControl.parent.active = false;
    }

    protected start(): void {
        this.onEventCamera();
        this.onEventPlayerBoost();
    }

    protected update(dt: number): void {
        
        //Mul21: Di chuyển camera
        if(this.player.node) {
            const positionPlayer = this.player.node.getPosition();
            // var followPlayer = cc.follow(this.player.node, cc.rect(0, 0, 10, 10));
            // this.node.runAction(followPlayer);

            this.node.x = cc.misc.clampf(positionPlayer.x, this.cameraClampHorizontal.x, this.cameraClampHorizontal.y);
            this.node.y = cc.misc.clampf(positionPlayer.y, this.cameraClampVertical.x, this.cameraClampVertical.y);
        }
        else {
            this.playerControl.parent.active = false;
            this.playerBoost.active = false;
            this.offEventCamera();
            this.offEventPlayerBoost();
        }
    }
    
    getTouchPositionInScreen(event: cc.Event.EventTouch) {
        const touchPosition = event.getLocation().sub(cc.v2(this.screen.x * 0.5, this.screen.y * 0.5));
        return touchPosition;
    }

    onEventCamera() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    offEventCamera() {
        this.node.off(cc.Node.EventType.TOUCH_START);
        this.node.off(cc.Node.EventType.TOUCH_MOVE);
        this.node.off(cc.Node.EventType.TOUCH_END);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL);
    }

    onTouchStart(event: cc.Event.EventTouch) {
        this.playerControl.parent.active = true;
        this.playerControl.parent.setPosition(this.getTouchPositionInScreen(event));
        this.playerControl.setPosition(new cc.Vec2(0, 0));   
        
        // const posInCamera = this.node.convertToNodeSpaceAR(event.getLocationInView());
        console.log("event.getLocation(): ", event.getLocation())
        console.log("event.getLocation(): ", event.getLocationInView())
        console.log("cc.view.getVisibleSize(): ", cc.view.getVisibleSize())
        console.log("cc.view.getFrameSize(): ", cc.view.getFrameSize())
    }

    onTouchMove(event: cc.Event.EventTouch) {
        const dental = event.getDelta();
        const offsetX = this.playerControl.x + dental.x;
        const offsetY = this.playerControl.y + dental.y;
        this.playerControl.x = cc.misc.clampf(offsetX, this.playerControlClampHorizontal.x, this.playerControlClampVertical.y);
        this.playerControl.y = cc.misc.clampf(offsetY, this.playerControlClampVertical.x, this.playerControlClampVertical.y);

        this.player.setDataPlayer(100, this.playerControl.getPosition().normalize());
    }

    onTouchEnd(event: cc.Event.EventTouch) {
        this.playerControl.parent.active = false;
    }

    onTouchCancel(event: cc.Event.EventTouch) {
        this.playerControl.parent.active = false;
    }

    onEventPlayerBoost() {
        this.playerBoost.on(cc.Node.EventType.TOUCH_START, this.onBoostTouchStart, this);
        this.playerBoost.on(cc.Node.EventType.TOUCH_MOVE, this.onBoostTouchMove, this);
        this.playerBoost.on(cc.Node.EventType.TOUCH_END, this.onBoostTouchEnd, this);
        this.playerBoost.on(cc.Node.EventType.TOUCH_CANCEL, this.onBoostTouchCancel, this);
    }

    offEventPlayerBoost() {
        this.playerBoost.off(cc.Node.EventType.TOUCH_START);
        this.playerBoost.off(cc.Node.EventType.TOUCH_MOVE);
        this.playerBoost.off(cc.Node.EventType.TOUCH_END);
        this.playerBoost.off(cc.Node.EventType.TOUCH_CANCEL);
    }

    onBoostTouchStart(event: cc.Event.EventTouch){
        this.player.boostSpeed(500);
    }

    onBoostTouchMove(event: cc.Event.EventTouch){

    }

    onBoostTouchEnd(event: cc.Event.EventTouch){
        this.player.resertSpeed();
    }

    onBoostTouchCancel(event: cc.Event.EventTouch){
        this.player.resertSpeed();
    }

}
