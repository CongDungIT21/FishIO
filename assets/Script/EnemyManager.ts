import ConvertExtension from "./ConvertExtension";
import Enemy from "./Enemy/Enemy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyManager extends cc.Component {
    private static _instance: EnemyManager;

    public static get instance(): EnemyManager {
        if (!EnemyManager._instance) {
            EnemyManager._instance = new EnemyManager();
        }

        return EnemyManager._instance;
    }

    @property(cc.Prefab)
    enemyPrefab: cc.Prefab[] = [];
    
    @property(cc.Node)
    outSide: cc.Node = null;

    @property(cc.Node)
    inSide: cc.Node = null;

    @property(cc.Node)
    enemyHolder: cc.Node = null;

    @property(cc.Node)
    player: cc.Node = null;

    @property(cc.Prefab)
    cutting: cc.Prefab = null;

    private timeDelay: number = 2;
    private timeCounter: number = 0;
    private numberEnemy: number = 0;
    private posOutside: cc.Vec3[] = [];
    private posInside: cc.Vec3[] = [];

    onLoad() {
        EnemyManager._instance = this;
        this.loadPosition();
    }

    loadPosition() {
        this.outSide.children.forEach(node => this.posOutside.push(node.position));
        this.inSide.children.forEach(node => this.posInside.push(node.position));
    }

    update(dt: number) {
        this.timeCounter += dt;
        if(this.timeCounter >= this.timeDelay && this.numberEnemy < 10) 
        { 
            this.timeCounter = 0;
            this.createrNewEnemy();
        }
    }

    createrNewEnemy() {
        const idxPrefab: number = Math.floor(Math.random() * this.enemyPrefab.length);
        const enemy = cc.instantiate(this.enemyPrefab[idxPrefab]);

        const idxPosOutside: number = Math.floor(Math.random() * this.posOutside.length);        
        const positionOutside = this.posOutside[idxPosOutside];

        const idxPosInside: number = Math.floor(Math.random() * this.posInside.length);
        const positionInside = this.posInside[idxPosInside];

        this.enemyHolder.addChild(enemy);
        enemy.getComponent(Enemy).setDataMovingToVisible(ConvertExtension.vec3ToVec2(positionOutside), ConvertExtension.vec3ToVec2(positionInside));
        this.numberEnemy += 1;        
    }

    getRandomNumber(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    getPlayer() {
        return this.player;
    }

    onDead(position: cc.Vec2) {
        let cutting = cc.instantiate(this.cutting);
        this.enemyHolder.addChild(cutting);
        cutting.setPosition(position);
        console.log(cutting.getPosition());
    }
}
