// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {
    private SPEED_DEFAULT: number = 100;
    private speed: number = 0;
    private normalized: cc.Vec2 = new cc.Vec2(1, 1);
    private isMoving: boolean = false;
    private clampHorizontal: cc.Vec2 = new cc.Vec2(-0.5, 0.5).mul(1920);
    private clampVertical: cc.Vec2 = new cc.Vec2(-0.5, 0.5).mul(1080);

    protected onLoad(): void {
        this.speed = this.SPEED_DEFAULT;
    }

    update(dt: number) {
        if(this.isMoving) {
            const offsetX = this.node.x + dt * this.speed * this.normalized.x;
            const offsetY = this.node.y + dt * this.speed * this.normalized.y;

            this.node.x = cc.misc.clampf(offsetX, this.clampHorizontal.x, this.clampHorizontal.y);
            this.node.y = cc.misc.clampf(offsetY, this.clampVertical.x, this.clampVertical.y);

            let angle = this.rotationNodeWithNormalize(this.normalized);
            this.rotationTween(angle, dt);
        }
    }

    setDataPlayer(speed: number, normalize: cc.Vec2) {
        this.speed = speed;        
        if(normalize) 
            this.normalized = normalize;

        this.isMoving = true;
    }

    boostSpeed(speed: number) {
        this.speed = speed;
    }

    resertSpeed() {
        this.speed = this.SPEED_DEFAULT;
    }
    
    rotationNodeWithNormalize(normalize: cc.Vec2) {
        let radian = Math.atan2(normalize.y, normalize.x);
        let angle = cc.misc.radiansToDegrees(radian);
        // this.node.angle = angle;

        return angle;
    }

    rotationTween(angle: number, duration: number) {
        // cc.Tween.stopAllByTarget(this.node);
        cc.tween(this.node)
            .to(duration, {angle: angle}, {easing: "linear"})
            .call(() => {
                // console.log("Oke")
                if(0 <= angle && angle < 90) {
                    // this.node.angle = angle;
                    this.node.scaleX = 1;
                    this.node.scaleY = 1;
                }
                else if(90 <= angle && angle < 180) {
                    // this.node.angle = angle;
                    this.node.scaleX = 1;
                    this.node.scaleY = -1;
                }
                else if(0 >= angle && angle > -90) {
                    // this.node.angle = angle;
                    this.node.scaleX = 1;
                    this.node.scaleY = 1;
                }
                else if(-90 >= angle && angle > -180) {
                    // this.node.angle = angle;
                    this.node.scaleX = 1;
                    this.node.scaleY = -1;
                }
            })
            .start();
    }
}
