// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ConvertExtension from "./ConvertExtension";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameController extends cc.Component {
    private static _instance: GameController;

    public static get instance(): GameController {
        if (!GameController._instance) {
            GameController._instance = new GameController();
        }

        return GameController._instance;
    }

    // @property(cc.Node)
    // fish: cc.Node;
    // @property(cc.Node)
    // point: cc.Node;
    // @property(cc.Node)
    // camera: cc.Node;
    // @property(cc.Node)
    // boost: cc.Node;
    
    // private screen: cc.Vec2 = new cc.Vec2(cc.view.getVisibleSize().width, cc.view.getVisibleSize().height);
    // private cameraClampHorizon: cc.Vec2;
    // private cameraClampVertical: cc.Vec2;
    // private fishClampHorizon: cc.Vec2;
    // private fishClampVertical: cc.Vec2;
    // private speed: number;
    // private startTouchPosition: cc.Vec2;
    // private normalized: cc.Vec2;    

    onLoad() {
        GameController._instance = this;

        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true; 

        // let sizeBackground = new cc.Size(1920, 1080);
        // this.cameraClampHorizon = new cc.Vec2(-0.5, 0.5).mul(sizeBackground.width - this.camera.width)
        // this.cameraClampVertical = new cc.Vec2(-0.5, 0.5).mul(sizeBackground.height - this.camera.height)
        // this.fishClampHorizon = new cc.Vec2(-0.5, 0.5).mul(sizeBackground.width - this.fish.width);
        // this.fishClampVertical = new cc.Vec2(-0.5, 0.5).mul(sizeBackground.height - this.fish.height);
        // this.speed = 100;
    }

    // start() {
    //     this.point.parent.active = false;                
    //     this.camera.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
    //     this.camera.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoved, this);
    //     this.camera.on(cc.Node.EventType.TOUCH_END, this.onTouchExit, this);
    //     this.camera.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchExit, this);

    //     this.boost.on(cc.Node.EventType.TOUCH_START, this.boostOnTouchBegan, this);
    //     this.boost.on(cc.Node.EventType.TOUCH_END, this.boostTouchExit, this);
    //     this.camera.on(cc.Node.EventType.TOUCH_CANCEL, this.boostTouchExit, this);
    // } 

    // boostOnTouchBegan(event: cc.Event.EventTouch) {
    //     // console.log("boostOnTouchBegan");
    //     this.speed = 500;
    // }

    // boostTouchExit(event: cc.Event.EventTouch) {
    //     // console.log("boostTouchExit");
    //     this.speed = 100;
    // }

    // getMousePoint(event: cc.Event.EventTouch): cc.Vec2{
    //     let mousePoint = event.getLocation().sub(cc.v2(this.screen.x * 0.5, this.screen.y * 0.5));
    //     // console.log("MoursePoint: ", mousePoint.x, mousePoint.y);
    //     return mousePoint
    // }

    // onTouchBegan(event: cc.Event.EventTouch): void{      
    //     // console.log("onTouchBegan");  
    //     // console.log("event.getLocation(): ", event.getLocation().x, event.getLocation().y);
    //     // console.log("event.getLocationInView(): ", event.getLocationInView().x, event.getLocationInView().y);
    //     // //Mul21: Điểm chạm trên camera coordinates
    //     // console.log("Camene Touch Point: ", this.getMousePoint(event).x, this.getMousePoint(event).y);
    //     this.startTouchPosition = this.getMousePoint(event);
    //     this.point.parent.active = true;
    //     this.point.parent.setPosition(this.startTouchPosition);
    // }

    // onTouchMoved(event: cc.Event.EventTouch): void{
    //     // console.log("onTouchMoved"); 
    //     //Mul21: Điểm chạm trên camera coordinates
    //     const cameraPos = this.getMousePoint(event);
    //     const dental = event.getDelta();      
        
    //     this.normalized = cameraPos.sub(this.startTouchPosition).normalize();

    //     let posX = this.point.x + dental.x;
    //     let posY = this.point.y + dental.y;

    //     this.point.x = cc.misc.clampf(posX, -100, 100);
    //     this.point.y = cc.misc.clampf(posY, -100, 100);

    //     //Mul21: Cần Optimize
    //     let radian = (cc.Vec2.RIGHT).angle(this.point.getPosition());
    //     let angle = cc.misc.radiansToDegrees(radian);
    //     angle = (this.point.getPosition().y < 0) ? -angle : angle;
    //     // console.log("Angle: ", angle);

    //     if(0 <= angle && angle < 90) {
    //         this.fish.angle = angle;
    //         this.fish.scaleX = 1;
    //         this.fish.scaleY = 1;
    //     }
    //     else if(90 <= angle && angle < 180) {
    //         this.fish.angle = angle;
    //         this.fish.scaleX = 1;
    //         this.fish.scaleY = -1;
    //     }
    //     else if(0 >= angle && angle > -90) {
    //         this.fish.angle = angle;
    //         this.fish.scaleX = 1;
    //         this.fish.scaleY = 1;
    //     }
    //     else if(-90 >= angle && angle > -180) {
    //         this.fish.angle = angle;
    //         this.fish.scaleX = 1;
    //         this.fish.scaleY = -1;
    //     }
    // }

    // onTouchExit(event: cc.Event.EventTouch): void{
    //     console.log("onTouchExit"); 
    //     this.point.parent.active = false;
    //     this.point.setPosition(new cc.Vec2(0, 0));
    // }

    // update(dt: number) {
    //     if(this.normalized) {
    //         let fishX = this.fish.position.x + this.speed * dt * this.normalized.x;
    //         let fishY = this.fish.position.y + this.speed * dt * this.normalized.y;

    //         fishX = cc.misc.clampf(fishX, this.fishClampHorizon.x, this.fishClampHorizon.y);
    //         fishY = cc.misc.clampf(fishY, this.fishClampVertical.x, this.fishClampVertical.y);
    //         this.fish.position = ConvertExtension.vec2ToVec3(new cc.Vec2(fishX, fishY));

    //         let cameraX = cc.misc.clampf(this.fish.position.x, this.cameraClampHorizon.x, this.cameraClampHorizon.y);
    //         let cameraY = cc.misc.clampf(this.fish.position.y, this.cameraClampVertical.x, this.cameraClampVertical.y);
    //         this.camera.x = cameraX;
    //         this.camera.y = cameraY;
    //     }
    // }
}
