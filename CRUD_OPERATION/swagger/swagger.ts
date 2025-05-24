// index.ts
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import { Controller, Get, Route, Tags, Body, Post } from "tsoa";
import { RegisterRoutes } from "./routes"; // This will be generated

// ---------- tsoa controller logic in same file -------------------

// Models (Interfaces)
interface User {
  id: string;
  name: string;
}

interface CreateUserRequest {
  name: string;
}

// TSOA Controller
@Route("users")
@Tags("Users")
export class UserController extends Controller {
  private users: User[] = [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
  ];

  @Get("/")
  public async getUsers(): Promise<User[]> {
    return this.users;
  }

  @Post("/")
  public async createUser(@Body() body: CreateUserRequest): Promise<User> {
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      name: body.name,
    };
    this.users.push(newUser);
    return newUser;
  }
}

const app = express();
app.use(bodyParser.json());

// Serve Swagger UI
import swaggerDocument from "./swagger.json";
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Register TSOA-generated routes
RegisterRoutes(app);

// Default route
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from tsoa in one file!");
});

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
  console.log("Swagger UI at http://localhost:3000/docs");
});
