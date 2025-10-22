import { createNavigationContainerRef } from "@react-navigation/native"
import { RootStackParamList } from "./Routes";
import Logger from "../utils/Logger";


export const navigationRef = createNavigationContainerRef<RootStackParamList>()

type NavigationStateType = {
  index: number;
  routes: Array<{ name: string; key: string; params?: Record<string, any> }>;
};

export function parseAndLogRoute(state: NavigationStateType | undefined) {
    if (!state) return;
    const { routes, index } = state;
    const currentRoute = routes[index];
    Logger.info("Cuurent Route", {name:currentRoute?.name, params:currentRoute?.params})
}

export function setIsNavigationReady() {
    Logger.info("Navigation is ready")
}