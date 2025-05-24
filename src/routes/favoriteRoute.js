import { Router } from "express";
import { validateMiddleUser } from "../middleware/validateMiddleUser";
import { createFavorite } from "../controllers/favorite/createFavorite";
import { getFavorites } from "../controllers/favorite/getFavorite";
import { deleteFavorite } from "../controllers/favorite/deleteFavorite";

const favoriteRoute = new Router();

// create Favorite Jobs
favoriteRoute.post("/api/favorite/jobs/:id", validateMiddleUser, createFavorite );

// get Favorite Jobs
favoriteRoute.get("/api/favorite/jobs", validateMiddleUser, getFavorites);

// delete Favorite Jobs
favoriteRoute.delete("/api/favorite/jobs/:id", validateMiddleUser, deleteFavorite);



export default favoriteRoute;