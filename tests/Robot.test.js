import Robot from "../dist/classes/Robot";

test("it creates a new robot", () => {
  let robot = new Robot();
  expect(robot.id).toBe(1);
  expect(robot.x).toBe(0);
  expect(robot.y).toBe(0);
  expect(robot.fieldOfView[0]).toBe("NORTH");
});

test("it creates a new robot with arguments", () => {
  let robot = new Robot(1, 4, "WEST");
  expect(robot.id).toBe(2);
  expect(robot.x).toBe(1);
  expect(robot.y).toBe(4);
  expect(robot.fieldOfView[0]).toBe("WEST");
});

test("it can turn left", () => {
  let robot = new Robot(1, 1, "NORTH");
  robot.turn("LEFT");
  expect(robot.fieldOfView[0]).toBe("WEST");
});

test("it can turn right", () => {
  let robot = new Robot(1, 1, "NORTH");
  robot.turn("RIGHT");
  expect(robot.fieldOfView[0]).toBe("EAST");
});

test("it can turn 360 degrees", () => {
  let robot = new Robot(1, 1, "NORTH");
  robot.turn("RIGHT");
  robot.turn("RIGHT");
  robot.turn("RIGHT");
  robot.turn("RIGHT");
  expect(robot.fieldOfView[0]).toBe("NORTH");
});
