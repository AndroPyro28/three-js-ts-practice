import {SphereInterface1} from "../interfaces/Sphere";

export class SphereClass1 implements SphereInterface1 {
    public step: (number) = 0;
    public speed: (number) = 0.01;
    public wireframe: (boolean) = false;
    public sphereColor: (string) = 'yellow'; 
}