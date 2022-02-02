interface EntityInterface {
  x: number;
  y: number;
  getX(): number;
  getY(): number;
  setX(input: number): void;
  setY(input: number): void;
}

class Entity {
  static _id: number = 1;
  id: number;
  created_at: Date;
  x: number;
  y: number;

  constructor(x: any = 0, y: any = 0) {
    this.id = Entity._id++;
    this.created_at = new Date();
    this.x = parseInt(x);
    this.y = parseInt(y);
  }
}

export default Entity;

export { Entity, EntityInterface };
