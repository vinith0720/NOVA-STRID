import { z as basez } from "zod/v4";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(basez);

export const z = basez;
