import { createContext } from "react";

const AppContext = createContext<{ routes?: any }>({});

export default AppContext;
