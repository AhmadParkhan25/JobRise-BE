import { Router } from "express";
import { validateMiddleUser } from "../middleware/validateMiddleUser";
import { createFavorite } from "../controllers/favorite/createFavorite";
import { getFavorites } from "../controllers/favorite/getFavorite";

const favoriteRoute = new Router();

// create Favorite Jobs
favoriteRoute.post("/api/favorite/jobs/:id", validateMiddleUser, createFavorite );

// get Favorite Jobs
favoriteRoute.get("/api/favorite/jobs", validateMiddleUser, getFavorites)



export default favoriteRoute;