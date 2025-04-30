  import express from "express";
  // import publicRoutes from "../routes/public.js";
  import v1Routes from "./v1/index.route.js";
  // import v2Routes from "./v2/index.js";

  const router = express.Router();

  // router.use("/public", publicRoutes);
  router.use("/v1", v1Routes);
  // router.use("/v2", v2Routes);

  export default router;

  export { router };
