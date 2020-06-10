import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation'



import Login from "./pages/login";
import ListSpots from "./pages/listspots";
import Book from "./pages/book";


const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        ListSpots,
        Book,
    })
);

export default Routes;
