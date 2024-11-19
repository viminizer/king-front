import { createSelector } from "reselect";

import { AppRootState, HomePageState } from "../../../libs/types/screen";

const homePage = (state: AppRootState) => state.homePage;

export const retrievePopularDishes = createSelector(
	homePage,
	(HomePageState: HomePageState) => HomePageState.popularDishes
);

export const retrieveNewDishes = createSelector(
	homePage,
	(HomePageState: HomePageState) => HomePageState.newDishes
);

export const retrieveTopUsers = createSelector(
	homePage,
	(HomePageState: HomePageState) => HomePageState.topUsers
);
