import { Entity, EntityInterface } from "./Entity";

interface RobotInterface {
  fieldOfView: Array<any>;
  turn(direction: string, callback: Function): void;
  report(callback: Function): void;
}

class Robot extends Entity implements EntityInterface, RobotInterface {
  fieldOfView: Array<any> = ["NORTH", "EAST", "SOUTH", "WEST"];

  constructor(x: number, y: number, f: string = "NORTH") {
    super(x, y);

    let facing = f.toUpperCase();

    while (this.fieldOfView[0] !== facing) {
      this.turn("LEFT");
    }
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.x;
  }

  getFacing(): string {
    return this.fieldOfView[0];
  }

  setX(value: number): void {
    this.x = value;
  }

  setY(value: number): void {
    this.y = value;
  }

  /**
   * Report the current position of the robot
   */
  report(cb?: Function): void {
    console.log(
      `The current position of the robot is ${this.x},${this.y} facing ${this.fieldOfView[0]}`
    );

    if (cb) cb();
  }

  /**
   * Rotates the robot 90 degrees left or right
   * @param direction
   */
  turn(direction: string, cb?: Function): void {
    switch (direction) {
      case "LEFT":
        this.fieldOfView = [this.fieldOfView.pop(), ...this.fieldOfView];
        break;
      case "RIGHT":
        let shift = this.fieldOfView.shift();
        this.fieldOfView = [...this.fieldOfView, shift];
        break;
    }

    if (cb) cb();
  }
}

export default Robot;
