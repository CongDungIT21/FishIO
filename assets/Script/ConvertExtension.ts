// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ConvertExtension {
    public static getPositionInOtherNode(spaceNode: cc.Node, targetNode: cc.Node) {
        if(targetNode.parent === null) {
            return null;
        }

		let pos = targetNode.parent.convertToWorldSpaceAR(targetNode.getPosition());
		return spaceNode.convertToNodeSpaceAR(pos);
    }

    public static getPositionInWorldSpace(node: cc.Node, nodePoint: cc.Vec3 = new cc.Vec3(0, 0, 0)) {
        return node.convertToWorldSpaceAR(nodePoint);
    }

    // Đặt giá trị world position cho node
    public static setWorldPositionToNode(node: cc.Node, worldPosition: cc.Vec3) {
        const localPos = node.parent?.convertToNodeSpaceAR(worldPosition);
        node.position = localPos;
    };

    // Lấy giá trị local position của node
    public static getLocalPositionFromWorldPosition(node: cc.Node, worldPosition: cc.Vec3): cc.Vec3 {
        const localPosition = node.parent?.convertToNodeSpaceAR(worldPosition);
        return localPosition;
    };

    public static getAngleTwoNode(node1: cc.Node, node2: cc.Node) {
        let angle = null;
        let pos1 = ConvertExtension.getPositionInOtherNode(node1, node2);
        let pos2 = ConvertExtension.getPositionInOtherNode(node2, node1);
        if(pos1 !== null) {
            const radian1 = pos1.angle(node2.getPosition());
            angle = cc.misc.radiansToDegrees(radian1);
        }
        if(pos2!== null) {
            const radian2 = pos2.angle(node1.getPosition());
            angle = cc.misc.radiansToDegrees(radian2);
        }

        return angle;
    }

    public static vec3ToVec2(v: cc.Vec3) : cc.Vec2{
        return cc.v2(v.x, v.y);
    }

    public static vec2ToVec3(v: cc.Vec2) : cc.Vec3{
        return cc.v3(v.x, v.y, 0);
    }
}
