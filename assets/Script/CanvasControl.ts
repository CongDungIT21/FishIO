// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CanvasControl extends cc.Component {
    private designResolution: cc.Size = new cc.Size(960, 640);
    private lastWitdh = 0;
    private lastHeight = 0;
    private canvas: cc.Canvas;

    onLoad() {
        // let tile =  cc.winSize.width / cc.winSize.height;
        // if (tile >= (16 / 9)) {
		// 	cc.Canvas.instance.fitHeight = true;
		// 	cc.Canvas.instance.fitWidth = false;
		// } else {
		// 	cc.Canvas.instance.fitHeight = false;
		// 	cc.Canvas.instance.fitWidth = true;
		// }

        // this.designResolution = cc.size(960, 640)
		// this.lastWitdh = 0;
		// this.lastHeight = 0;
		// this.canvas = this.node.getComponent(cc.Canvas);
    }

    updateCanvas() {
		var frameSize = cc.view.getFrameSize();
		if (this.lastWitdh !== frameSize.width || this.lastHeight !== frameSize.height) {

			this.lastWitdh = frameSize.width;
			this.lastHeight = frameSize.height;

			if (this.designResolution.width / this.designResolution.height > frameSize.width / frameSize.height) {
				var newDesignSize = cc.size(this.designResolution.width, this.designResolution.width * (frameSize.height / frameSize.width));
				this.canvas.designResolution = newDesignSize;
			} else {
				var newDesignSize = cc.size(this.designResolution.height * (frameSize.width / frameSize.height), this.designResolution.height);
				this.canvas.designResolution = newDesignSize;
			}
		}
	}

    protected update(dt: number): void {
        // this.updateCanvas();
		this.makeResponsive();
    }

	makeResponsive() {
		let canvas = this.node.getComponent(cc.Canvas);
		let deviceResolution = cc.view.getFrameSize();
		
		// calculte design ratio
		let desiredRatio = canvas.designResolution.width / canvas.designResolution.height;
		// calculte device ratio
		let deviceRatio = deviceResolution.width / deviceResolution.height;
	
		if (deviceRatio >= desiredRatio) {
			canvas.fitHeight = true;
			canvas.fitWidth = false;
		} else if (deviceRatio < desiredRatio) {
			canvas.fitHeight = false;
			canvas.fitWidth = true;
		}
	}
}