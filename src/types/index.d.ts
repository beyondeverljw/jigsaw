export interface Painter{
    paint(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D
}
export interface IAngle{
    readonly Up: number;
    readonly Right: number;
    readonly Bottom: number;
    readonly Left: number;
}
/**
 * 瓦片（每一个方格）
 */
export interface Itiles extends Painter {
    readonly id: number;
    readonly imgOffsetX: number;
    readonly imgOffsetY: number;
    readonly width: number;
    readonly height: number;
    readonly img: HTMLImageElement;
    x: number;
    y: number;
    angle: IAngle;
}

/**
 * 瓦片管理器
 */
export interface ItilesManage extends Painter {
}