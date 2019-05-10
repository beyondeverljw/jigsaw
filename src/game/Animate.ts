// import { Ianimate, AnimateStatus, Itiles, Ipoint } from '../types/index';
import { Ianimate, Itiles, Ipoint } from '../types/index';
import { EventsManage } from '../eventsManage/index';
enum AnimateStatus{
    BeforeAnimate = 1,
    InAnimate = 2,
    EndAnimate = 3     
}

/**
 * 负责动画部分，运行时会抛出动画状态
 * @author lijianwei
 */
export class Animate implements Ianimate{
    status: number = AnimateStatus.BeforeAnimate;
    constructor(
        readonly ctx: CanvasRenderingContext2D,
        readonly em: EventsManage
    ){}
    run(p1: Itiles, p2: Itiles): void{
        let self = this;
        this.em.trigger('beforeAniamte');
        // 水平速度
        let hSpeed = (p2.posX - p1.posX) / 10,
            vSpeed = (p2.posY - p1.posY) / 10,
            // p1运动的终点位置
            p1End: Ipoint = {
                x: p2.posX,
                y: p2.posY
            },
            // p2运动的终点位置
            p2End: Ipoint = {
                x: p1.posX,
                y: p1.posY
            };
        (function anim(p1: Itiles, p2: Itiles){
            // console.group('in anim');
            // console.log(p1);
            // console.groupEnd();
            self.status = AnimateStatus.InAnimate;
            // 如果水平，垂直坐标同时为0，则已到达目标点，退出递归
            if((p1End.x - p1.posX) || (p1End.y - p1.posY)){
                window.requestAnimationFrame(()=> {
                    // 模拟一个加速度
                    hSpeed > 0? hSpeed += 0.5 : hSpeed -= 0.5;
                    vSpeed > 0? vSpeed += 0.5 : vSpeed -= 0.5;
                    // p1 <-> p2
                    let p1TargtX = p1.posX + hSpeed,
                        p1TargetY = p1.posY + vSpeed,
                        computeX = hSpeed > 0 ? Math.min : Math.max,
                        computeY = vSpeed > 0 ? Math.min : Math.max;
                    p1.erase();
                    p1.posX = computeX(p1TargtX, p1End.x);
                    p1.posY = computeY(p1TargetY, p1End.y);
                    p1.paintLight();
                    anim(p1, p2);
                });
            }else{
                p2.posX = p2End.x;
                p2.posY = p2End.y;
                p2.paint();
                self.status = AnimateStatus.EndAnimate;
                self.em.trigger('endAnimate');
            }
        })(p1, p2);
    }
    paint(){
        return this.ctx;
    }
}