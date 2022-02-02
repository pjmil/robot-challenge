import create2DArray from "../functions/create2DArray";
import Entity from "./Entity";
import Robot from "./Robot";

interface SurfaceInterface {
  area: Array<Array<number>>;
  entities: Array<Robot>;
  add(entity: Robot, cb: Function): void;
  remove(id: number, cb: Function): void;
  move(entity: Robot, cb: Function): void;
  validateMove(coords: Array<number>, direction: string): boolean;
  getYOffset(input: number): number;
}

class Surface implements SurfaceInterface {
  area: Array<Array<number>>;
  entities: Array<Robot>;

  constructor(x: number = 5, y: number = 5) {
    this.area = create2DArray(x, y);
    this.entities = [];
  }

  getArea(): Array<Array<number>> {
    return this.area;
  }

  getEntities(): Array<Entity> {
    return this.entities;
  }

  getYOffset(input: number): number {
    return this.area.length - input - 1;
  }

  /**
   * Places an Entity on the Surface
   * @param entity
   * @returns
   */
  add(entity: Robot, cb?: Function): void {
    this.area[this.getYOffset(entity.y)][entity.x] = entity.id;
    this.entities.push(entity);

    if (cb) cb();
  }

  /**
   * Resets the surface
   */
  refresh(): void {
    this.area = create2DArray(this.area.length, this.area[0].length);
    this.entities = [];
  }

  /**
   * Removes an Entity from the Surface
   * @param id
   */
  remove(id: number, cb?: Function): void {
    this.entities = this.entities.filter((item) => item.id !== id);

    if (cb) cb();
  }

  /**
   * Moves the entity 1 place forward
   * @param entity
   * @param cb
   * @returns
   */
  move(entity: Robot, cb?: Function): void {
    if (
      !this.validateMove(
        [entity.x, this.getYOffset(entity.y)],
        entity.getFacing()
      )
    ) {
      console.log("Out of bounds:" + [entity.x, this.getYOffset(entity.y)]);
      if (cb) {
        return cb();
      }
    }

    this.area[this.getYOffset(entity.y)][entity.x] = 0;

    switch (entity.getFacing()) {
      case "NORTH":
        this.area[this.getYOffset(entity.y) - 1][entity.x] = entity.id;
        entity.setY(++entity.y);
        break;
      case "SOUTH":
        this.area[this.getYOffset(entity.y) + 1][entity.x] = entity.id;
        entity.setY(--entity.y);
        break;
      case "EAST":
        this.area[this.getYOffset(entity.y)][entity.x + 1] = entity.id;
        entity.setX(++entity.x);
        break;
      case "WEST":
        this.area[this.getYOffset(entity.y)][entity.x - 1] = entity.id;
        entity.setX(--entity.x);
        break;
    }

    if (cb) cb();
  }

  /**
   * Check if the target cell is empty or not
   * @param coords
   * @param direction
   */
  validateMove(coords: Array<number>, direction: string): boolean {
    let [x, y] = coords;
    let valid = false;

    switch (direction) {
      case "NORTH":
        valid = this.area[y - 1]?.[x] === 0;
        break;
      case "SOUTH":
        valid = this.area[y + 1]?.[x] === 0;
        break;
      case "EAST":
        valid = this.area[y]?.[x + 1] === 0;
        break;
      case "WEST":
        valid = this.area[y]?.[x - 1] === 0;
        break;
      default:
        valid = false;
    }

    return valid;
  }
}

export default Surface;
