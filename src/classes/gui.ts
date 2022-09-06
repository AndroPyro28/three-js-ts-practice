import {GuiInterface1} from "../interfaces/gui";

export class GuiClass1 implements GuiInterface1 {
    public step: (number) = 0;
    public speed: (number) = 0.01;
    public wireframe: (boolean) = false;
    public sphereColor: (string) = 'yellow'; 
    public angle:(number) = 0.2;
    public penumbra:(number) = 0;
    public intensity:(number) = 1;
}