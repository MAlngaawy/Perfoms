import { useLayoutEffect, useState } from "react";
import { Router } from "react-router-dom";
import History from "~/@history/@history";

function BrowserRouter({ basename, children, window }: any) {
  const [state, setState] = useState({
    action: History.action,
    location: History.location,
  });

  useLayoutEffect(() => History.listen(setState), []);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={History}
    >
      {children}
    </Router>
  );
}

export default BrowserRouter;
