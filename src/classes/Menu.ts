import readline from "readline";
import reportError from "../functions/reportError";
import Surface from "./Surface";
import Robot from "./Robot";

class Menu {
  validCommands: Array<string> = ["PLACE", "ROTATE", "MOVE", "REPORT"];
  validDirections: Array<string> = ["NORTH", "EAST", "SOUTH", "WEST"];
  surface: Surface;
  currentRobot: Robot | undefined;

  constructor() {
    this.surface = new Surface(5, 5);
    this.currentRobot = undefined;
  }

  private __io() {
    return readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  run(): boolean {
    let io = this.__io();

    io.question(
      "Place your robot by issuing a PLACE command.\n",
      (answer: string) => {
        io.close();

        let args: any[];

        ({ args } = this.interpret(answer));

        if (!this.isValidPlace(args)) {
          return this.run();
        }

        let robot = new Robot(args[0], args[1], args[2]);

        this.surface.add(robot);

        this.currentRobot = robot;

        robot.report();

        console.log(this.listCommands());

        this.main();
      }
    );

    return true;
  }

  main() {
    let io = this.__io();

    io.question(">", (answer: string) => {
      io.close();

      let command: string, args: any;

      ({ command, args } = this.interpret(answer));

      switch (command) {
        case "PLACE":
          this.surface.refresh();
          this.place(args[0], args[1], args[2]);
          break;
        case "LEFT":
          this.left();
          break;
        case "RIGHT":
          this.right();
          break;
        case "MOVE":
          this.move();
          break;
        case "REPORT":
          this.report();
          break;
        case "MAP":
          this.display();
          break;
        default:
          return false;
      }
    });
  }

  interpret(input: string) {
    let inputs = input.split(" ");
    let args: any[] = inputs[1]?.split(",");

    return { command: inputs[0].toUpperCase(), args };
  }

  place(x: number, y: number, f: string) {
    if (!this.isValidPlace([x, y, f])) {
      console.log("Invalid PLACE command.");
      return this.main();
    }

    let robot = new Robot(x, y, f);
    this.currentRobot = robot;
    this.surface.add(robot, () => this.main());
  }

  move() {
    if (this.currentRobot) {
      this.surface.move(this.currentRobot, () => this.main());
    }
  }

  left() {
    this.currentRobot?.turn("LEFT", () => this.main());
  }

  right() {
    this.currentRobot?.turn("RIGHT", () => this.main());
  }

  report() {
    this.currentRobot?.report(() => this.main());
  }

  display() {
    this.currentRobot?.report();
    console.log(this.surface.area);
    this.main();
  }

  /**
   * Lists all possible commands
   * @returns
   */
  listCommands(): string {
    return `Valid commands are:
      PLACE X,Y,F
      LEFT
      RIGHT
      MOVE
      REPORT
    `;
  }

  /**
   * Checks if a command is valid
   * @param input
   * @returns
   */
  isValidCommand(input: string): boolean {
    return this.validCommands.includes(input);
  }

  /**
   * Checks if the arguments provided to the PLACE command are valid
   * @param args
   * @returns
   */
  isValidPlace(args: any[]): boolean {
    if (args.length !== 3) {
      return reportError("Missing arguments, expected 3.");
    }

    if (Number.isNaN(args[0])) {
      return reportError(`Expected number, recieved ${args[0]}`);
    }

    if (Number.isNaN(args[1])) {
      return reportError(`Expected number, recieved ${args[1]}`);
    }

    if (args[0] < 0 || args[0] >= this.surface.area[0].length) {
      return reportError("The X co-ordinate is not on the surface.");
    }

    if (args[1] < 0 || args[1] >= this.surface.area.length) {
      return reportError("The Y co-ordinate is not on the surface.");
    }

    if (!this.validDirections.includes(args[2].toUpperCase())) {
      return reportError("Invalid direction.");
    }

    return true;
  }
}

export default Menu;
