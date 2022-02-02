import { expect, test } from "@jest/globals";
import Robot from "../dist/classes/Robot";
import Surface from "../dist/classes/Surface";

test("it creates a new surface", () => {
  let surface = new Surface();
  expect(surface).toBeDefined();
});

test("it creates a new surface with arguments", () => {
  let surface = new Surface(3, 3);
  expect(surface).toBeDefined();

  expect(surface.area[0].length).toBe(3);
  expect(surface.area[1].length).toBe(3);
  expect(surface.area[2].length).toBe(3);
});

test("it can add a robot", () => {
  let surface = new Surface();
  let robot = new Robot(1, 1, "WEST");

  surface.add(robot);

  expect(surface.entities.length).toBe(1);
  expect(surface.entities).toContain(robot);
  expect(surface.area[surface.getYOffset(1)][1]).toBe(robot.id);
});

test("it can remove a robot", () => {
  let surface = new Surface();
  let robot = new Robot(2, 2, "EAST");

  surface.add(robot);

  expect(surface.entities.length).toBe(1);
  expect(surface.entities).toContain(robot);

  surface.remove(robot.id);

  expect(surface.entities.length).toBe(0);
});

test("it returns {true} if a move is valid", () => {
  let surface = new Surface();
  let robot = new Robot(3, 3, "SOUTH");

  surface.add(robot);

  let moveIsValid = surface.validateMove(
    [robot.x, robot.y],
    robot.fieldOfView[0]
  );

  expect(moveIsValid).toBe(true);
});

test("it returns {false} if a move is invalid", () => {
  let surface = new Surface();
  let robot = new Robot(0, 0, "WEST");

  surface.add(robot);

  let moveIsValid = surface.validateMove(
    [robot.x, robot.y],
    robot.fieldOfView[0]
  );

  expect(moveIsValid).toBe(false);
});

test("it can move an entity facing {NORTH}", () => {
  let surface = new Surface();
  let robot = new Robot(2, 2, "NORTH");

  surface.add(robot);

  expect(surface.area[2][2]).toBe(robot.id);

  surface.move(robot);

  expect(surface.area[2][2]).toBe(0);
  expect(surface.area[1][2]).toBe(robot.id);
});

test("it can move an entity facing {EAST}", () => {
  let surface = new Surface();
  let robot = new Robot(2, 2, "EAST");

  surface.add(robot);

  expect(surface.area[2][2]).toBe(robot.id);

  surface.move(robot);

  expect(surface.area[2][2]).toBe(0);
  expect(surface.area[2][3]).toBe(robot.id);
});

test("it can move an entity facing {SOUTH}", () => {
  let surface = new Surface();
  let robot = new Robot(2, 2, "SOUTH");

  surface.add(robot);

  expect(surface.area[2][2]).toBe(robot.id);

  surface.move(robot);

  expect(surface.area[2][2]).toBe(0);
  expect(surface.area[3][2]).toBe(robot.id);
});

test("it can move an entity facing {WEST}", () => {
  let surface = new Surface();
  let robot = new Robot(2, 2, "WEST");

  surface.add(robot);

  expect(surface.area[2][2]).toBe(robot.id);

  surface.move(robot);

  expect(surface.area[2][2]).toBe(0);
  expect(surface.area[2][1]).toBe(robot.id);
});
