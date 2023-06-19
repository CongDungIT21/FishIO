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

    private target: cc.Node;
    private overview: boolean = true;
    private smoothFollow: boolean = true;
    private startFollow: boolean = true;
    private useBoundaries: boolean = true;

    protected onLoad(): void {
        this.playerControl.parent.active = false;
    }

    protected start(): void {
        this.onEventCamera();
        this.onEventPlayerBoost();
    }

    // protected update(dt: number): void {
        
    //     //Mul21: Di chuyển camera
    //     if(this.player.node) {
    //         const positionPlayer = this.player.node.getPosition();
    //         // var followPlayer = cc.follow(this.player.node, cc.rect(0, 0, 10, 10));
    //         // this.node.runAction(followPlayer);

    //         this.node.x = cc.misc.clampf(positionPlayer.x, this.cameraClampHorizontal.x, this.cameraClampHorizontal.y);
    //         this.node.y = cc.misc.clampf(positionPlayer.y, this.cameraClampVertical.x, this.cameraClampVertical.y);
    //     }
    //     else {
    //         this.playerControl.parent.active = false;
    //         this.playerBoost.active = false;
    //         this.offEventCamera();
    //         this.offEventPlayerBoost();
    //     }
    // }

    protected lateUpdate(dt: number): void {
        let targetPos;
        
        this.target = this.player.node;
        if(!this.target.parent) return;

        // if (this.overview){
        //     targetPos = this.target.parent.convertToWorldSpaceAR(this.getOverviewTargetsMidpoint());
        // } else {
        //     targetPos = this.target.parent.convertToWorldSpaceAR(this.target.position);
        // }
        targetPos = this.target.parent.convertToWorldSpaceAR(this.target.position);
        // console.log("targetPos: ", targetPos);
        // this.node.setPosition(targetPos);
        // ConvertExtension.setWorldPositionToNode(this.node, targetPos);
        // if (this.pointerPan && this.pointerPos) {
        //     let xDelta = this.pointerPos.x / (this.visibleSize.width/2) - 1;
        //     let yDelta = this.pointerPos.y / (this.visibleSize.height/2) - 1;
        //     xDelta *= this.pointerXMult;
        //     yDelta *= this.pointerYMult;
        //     targetPos = cc.pAdd(targetPos, cc.p(xDelta, yDelta));
        // }

        // smooth follow
        // this.followX = 100;
        // this.followY = 200;
        // this.followRatio = 1;
        // this.minFollowDist = 50;
        let posCameraInWorld = this.node.parent.convertToWorldSpaceAR(this.node.position);
        if (this.smoothFollow) {
            //console.log("111111")
            if (Math.abs(targetPos.x - posCameraInWorld.x) >= 100 ||
                Math.abs(targetPos.y - posCameraInWorld.y) >= 100) {//when camera and target distance is larger than max distance
                //console.log("222222")
                this.startFollow = true;
            }
            if (this.startFollow) {
                //console.log("333333")
                // this.node.position = this.node.position.lerp(targetPos, dt);
                // let posCameraInWorld = this.node.parent.convertToWorldSpaceAR(this.node.position);

                let newPos = posCameraInWorld.lerp(targetPos, (cc.Vec2.distance(targetPos, posCameraInWorld))/100 * dt);
                ConvertExtension.setWorldPositionToNode(this.node, newPos);
                if (cc.Vec2.distance(targetPos, newPos) <= 50) {
                    //console.log("444444")
                    this.startFollow = false;
                }
            }
        } else {
            //console.log("555555")
            // this.node.position = this.node.parent.convertToNodeSpaceAR(targetPos);
            let result = this.node.parent.convertToNodeSpaceAR(targetPos);
            result.x += this.node.x;
            result.y += this.node.y;

            this.node.position = result;
        }

        // //speed zoom
        // if (this.speedZoom) {
        //     let curSpeed = Math.abs(this.previousPos.x - targetPos.x) / dt;
        //     let ratio = 0;
        //     if (curSpeed > this.zoomOutSpeed) {
        //         ratio = 1 - (curSpeed - this.zoomOutSpeed) / (this.zoomInSpeed  - this.zoomOutSpeed);
        //         this.camera.zoomRatio = cc.lerp(this.camera.zoomRatio, ratio, 0.02);
        //     } else {
        //         this.camera.zoomRatio = cc.lerp(this.camera.zoomRatio, this.initZoomRatio, 0.02);
        //     }
        // }

        // this.previousPos = targetPos;
        
        // //jump zoom
        // if (this.jumpZoom) {
        //     let ratio = targetPos.y / cc.winSize.height;
        //     this.camera.zoomRatio = 1 + (0.6 - ratio) * 0.35;
        // }

        if(this.useBoundaries) {
            let offsetX =  (new cc.Vec2(-0.5, 0.5).mul(this.screen.x)).div(this.node.getComponent(cc.Camera).zoomRatio);
            let offsetY =  (new cc.Vec2(-0.5, 0.5).mul(this.screen.y)).div(this.node.getComponent(cc.Camera).zoomRatio);
            this.node.x = cc.misc.clampf(this.node.x, this.cameraClampHorizontal.x, this.cameraClampHorizontal.y);
            this.node.y = cc.misc.clampf(this.node.y, this.cameraClampVertical.x, this.cameraClampVertical.y);
        }

        // //boundaries
        //this.visibleSize.width = this.screen.x
        //this.leftBound
        // let leftBound = 0;
        // let rightBound = 0;
        // let topBound = 0;
        // let bottomBound = 0;
        // if (this.useBoundaries) {
        //     let width = (this.screen.x/2) / this.node.getComponent(cc.Camera).zoomRatio;
        //     let height = (this.screen.y/2) / this.node.getComponent(cc.Camera).zoomRatio;
        //     let minX = this.node.x - width;
        //     let maxX = this.node.x + width;  
        //     let minY = this.node.y - height;
        //     let maxY = this.node.y + height;
        //     if (minX < leftBound) {
        //         this.node.x = leftBound + width;
        //     }
        //     if (minY < bottomBound) {
        //         this.node.y = bottomBound + height;
        //     }
        //     if (maxX > rightBound) {
        //         this.node.x = rightBound - width;
        //     }
        //     if (maxY > topBound) {
        //         this.node.y = topBound - height;
        //     }
        // }        

        // console.error("////////////////////////////////")
    }
    
    getTouchPositionInScreen(event: cc.Event.EventTouch) {
        // const touchPosition = event.getLocation().sub(cc.v2(this.screen.x * 0.5, this.screen.y * 0.5));
        // return touchPosition;

        const touchPosition = event.getLocation();
        let result = this.node.convertToNodeSpaceAR(touchPosition);
        result.x = result.x + this.node.x;
        result.y = result.y + this.node.y;
        return result;
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
        // console.log("event.getLocation(): ", event.getLocation())
        // console.log("event.getLocation(): ", event.getLocationInView())
        // console.log("cc.view.getVisibleSize(): ", cc.view.getVisibleSize())
        // console.log("cc.view.getFrameSize(): ", cc.view.getFrameSize())
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
