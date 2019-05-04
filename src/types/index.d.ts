export interface Painter{
    paint(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D
}
export interface IAngle{
    readonly Up: number;
    readonly Right: number;
    readonly Bottom: number;
    readonly Left: number;
}
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