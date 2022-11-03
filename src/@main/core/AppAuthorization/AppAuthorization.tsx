import AppContext from "app/AppContext";
import { Component, PropsWithChildren } from "react";
import { Location, matchRoutes } from "react-router-dom";
import withRouter from "@main/core/withRouter";
import history from "@history";
import AppUtils from "@main/utils/AppUtils";
import { AppRouteObject } from "@main/types/Config-Types";

type Props = {
  location: Location;
  userRole?: string;
  loginRedirectUrl?: string;
};

let loginRedirectUrl: string | null = null;

class AppAuthorization extends Component<PropsWithChildren<Props>, any> {
  constructor(
    props: PropsWithChildren<Props>,
    context: any,
    public defaultLoginRedirectUrl = props.loginRedirectUrl || "/"
  ) {
    super(props);
    const { routes } = context;
    this.state = {
      accessGranted: true,
      routes,
    };
  }

  componentDidMount() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return nextState.accessGranted !== this.state.accessGranted;
  }

  componentDidUpdate() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  static getDerivedStateFromProps(props: Props, state: any) {
    const { location, userRole } = props;
    const { pathname } = location;

    const matchedRoutes = matchRoutes<AppRouteObject>(state.routes, pathname);
    const matched = matchedRoutes ? matchedRoutes[0] : false;
    return {
      accessGranted: matched
        ? AppUtils.hasPermission(matched.route.auth, userRole)
        : true,
    };
  }

  redirectRoute() {
    const { location, userRole } = this.props;
    const { pathname } = location;
    const redirectUrl = loginRedirectUrl || this.defaultLoginRedirectUrl;

    if (!userRole || userRole.length === 0) {
      setTimeout(() => history.push("/sign-in"), 0);
      loginRedirectUrl = pathname;
    } else {
      setTimeout(() => history.push(redirectUrl), 0);
      loginRedirectUrl = this.defaultLoginRedirectUrl;
    }
  }

  render() {
    return this.state.accessGranted ? <>{this.props.children}</> : null;
  }
}

AppAuthorization.contextType = AppContext;

export default withRouter(AppAuthorization);
