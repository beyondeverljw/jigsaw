import { IAngle } from '../types/index';

export default class Angle implements IAngle{
    readonly Up: number = Math.PI * (-1/2);
    readonly Right: number = Math.PI * 0;
    readonly Bottom: number = Math.PI * 1/2;
    readonly Left: number = Math.PI * 1;
}