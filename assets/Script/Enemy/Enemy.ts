// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { TypeCollision } from "../CollisionTag";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {
    private speed: number;
    private clampHorizontal: cc.Vec2;
    private clampVertical: cc.Vec2;
    private screen: cc.Vec2 = new cc.Vec2(1920, 1080);
    private targetPosition: cc.Vec2 = new cc.Vec2;

    //Mul21: Các loại di chuyển
    private isGoingToVisible: boolean = false;
    private isGoingToPosition: boolean = false;
    private isGoingToPlayer: boolean = false;

    private stopTraking: boolean = false;
    private TIME_DELAY_TRAKING: number = 5;
    private timeStopTracking: number = 0;

    private tweenRotation: any; 
    onLoad() {
        this.clampHorizontal = new cc.Vec2(-0.5, 0.5).mul(screen.width);
        this.clampVertical = new cc.Vec2(-0.5, 0.5).mul(screen.height);
        
        this.isGoingToVisible = false;
        this.isGoingToPosition = false;
        this.isGoingToPlayer = false;

        this.speed = 100;
    }

    start () {
    }

    update(dt: number){
        this.moving(dt);       
                
        if(this.stopTraking) {
            this.timeStopTracking += dt;
            if(this.timeStopTracking >= this.TIME_DELAY_TRAKING) {
                this.stopTraking = false;
            }
        }
    }

    setDataMovingToVisible(posOutside: cc.Vec2, posInside: cc.Vec2) {
        this.isGoingToVisible = true;
        this.node.setPosition(posOutside);
        this.targetPosition = posInside;
    }

    moving(dt: number) {    
        if(this.isGoingToVisible) {
            this.movingToVisible(dt, this.targetPosition);
        }

        if(this.isGoingToPosition)
        {
            this.movingToPoint(dt, this.targetPosition);
        }

        if(this.isGoingToPlayer) {
            this.movingToPlayer(dt, this.targetPosition);
        }
    }

    movingToVisible(dt: number, pos: cc.Vec2) {
        let normalized = pos.sub(this.node.getPosition()).normalize();                
        let offsetX = this.node.x + this.speed * normalized.x * dt;
        let offsetY = this.node.y + this.speed * normalized.y * dt; 
        
        this.node.x = offsetX;
        this.node.y = offsetY;

        let angle = this.rotationNodeWithNormalize(normalized);
        this.rotationTween(angle, dt);

        const epsilon = 1; // Độ sai số cho phép ~ Độ dài 1 của normalized

        if (Math.abs(this.node.x - pos.x) < epsilon && Math.abs(this.node.y - pos.y) < epsilon) {
            this.isGoingToVisible = false;
            this.isGoingToPosition = true;
    
            // Mul21 # Random một vị trí mới trong màn hình
            let poxX = this.getRandomNumber(this.clampHorizontal.x, this.clampHorizontal.y);
            let poxY = this.getRandomNumber(this.clampVertical.x, this.clampVertical.y);
            this.targetPosition = new cc.Vec2(poxX, poxY);
        }
    }

    movingToPoint(dt: number, pos: cc.Vec2) {
        let normalized = pos.sub(this.node.getPosition()).normalize();        
        let offsetX = this.node.x + this.speed * normalized.x * dt;
        let offsetY = this.node.y + this.speed * normalized.y * dt; 
        
        this.node.x = offsetX;
        this.node.y = offsetY;

        let angle = this.rotationNodeWithNormalize(normalized);
        this.rotationTween(angle, dt);

        const epsilon = 60; // Độ sai số cho phép  ~ Độ dài 1 của normalized
        if (Math.abs(this.node.x - pos.x) < epsilon && Math.abs(this.node.y - pos.y) < epsilon) {
            //Mul21 # Random một vị trí mới trong màn hình
            let poxX = this.getRandomNumber(this.clampHorizontal.x, this.clampHorizontal.y);
            let poxY = this.getRandomNumber(this.clampVertical.x, this.clampVertical.y);
            this.targetPosition = new cc.Vec2(poxX, poxY);
        }
    }

    getRandomNumber(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    movingToPlayer(dt: number, pos: cc.Vec2) {
        let normalized = pos.sub(this.node.getPosition()).normalize();        
        let offsetX = this.node.x + this.speed * normalized.x * dt;
        let offsetY = this.node.y + this.speed * normalized.y * dt; 
        
        this.node.x = offsetX;
        this.node.y = offsetY;

        let angle = this.rotationNodeWithNormalize(normalized);
        this.rotationTween(angle, dt);

        //Mul21: khi player bị giết bởi 1 enemy khác trong khi enemy này vẫn đang ở stay
        const epsilon = 1;
        if (Math.abs(this.node.x - pos.x) < epsilon && Math.abs(this.node.y - pos.y) < epsilon) {
            this.isGoingToPosition = true;
        }
    }

    rotationNodeWithNormalize(normalize: cc.Vec2) {
        let radian = Math.atan2(normalize.y, normalize.x);
        let angle = cc.misc.radiansToDegrees(radian); //-180 -> 180
        return angle;
    }

    rotationTween(angle: number, duration: number) {  
        if(0 <= angle && angle < 90) {
            // cc.tween(this.node)
            // .to(duration, {scaleX: 1, scaleY: 1, angle: this.node.angle + angle * duration})
            // .start()

            // this.node.angle = angle;
            // this.node.scaleX = 1;
            this.node.scaleY = 1;
        }
        else if(90 <= angle && angle < 180) {
            // this.node.angle = angle;
            // this.node.scaleX = 1;
            this.node.scaleY = -1;

            // cc.tween(this.node)
            // .to(duration, {scaleX: 1, scaleY: -1, angle: this.node.angle + angle * duration})
            // .start()            
        }
        else if(0 >= angle && angle > -90) {
            // this.node.angle = angle;
            // this.node.scaleX = 1;
            this.node.scaleY = 1;

            // cc.tween(this.node)
            // .to(duration, {scaleX: 1, scaleY: 1, angle: this.node.angle + angle * duration})
            // .start()
        }
        else if(-90 >= angle && angle > -180) {
            // this.node.angle = angle;
            // this.node.scaleX = 1;
            this.node.scaleY = -1;

            // cc.tween(this.node)
            // .to(duration, {scaleX: 1, scaleY: -1, angle: angle})
            // .start()
        }

        // angle = this.node.angle + angle * duration;
        
        this.node.angle = angle;
    }


    onCollisionEnter(other: cc.Collider, self: cc.Collider): void {
        // if(other.tag === TypeCollision.RADIUS_TRAKING_PLAYER)
    }
    onCollisionStay(other: cc.Collider, self: cc.Collider): void {
        if(other.tag === TypeCollision.RADIUS_TRAKING_PLAYER && this.stopTraking === false) {
            this.isGoingToPosition = false;
            this.isGoingToVisible = false;
            this.isGoingToPlayer = true;
            this.targetPosition = other.node.getPosition();
        }

        if(other.tag === TypeCollision.RADIUS_PLAYER && this.stopTraking === false) {
            this.stopTraking = true;
            this.timeStopTracking = 0;
            this.isGoingToPosition = true;
            this.isGoingToVisible = false;
            this.isGoingToPlayer = false;

            //Mul21: Kéo dài target postiton để đảm bảo sau TIME_DELAY_TRAKING mởi chuyển hưởng khác
            let normalized = this.targetPosition.sub(this.node.getPosition()).normalize();  
            this.targetPosition.x += this.TIME_DELAY_TRAKING * this.speed * normalized.x;
            this.targetPosition.y += this.TIME_DELAY_TRAKING * this.speed * normalized.y;
        }
    }
    onCollisionExit(other: cc.Collider, self: cc.Collider): void {
        // console.log("onCollisionEnter EnemyDamageReceive");
    }
}
