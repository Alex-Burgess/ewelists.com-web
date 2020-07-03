import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: C, props: cProps, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        cProps.isAuthenticated
          ? <C {...props} {...cProps} />
        : props.location.pathname !== "/logout"
          ? <Redirect
              to={`/login?redirect=${props.location.pathname}${props.location
                .search}`}
            />
          : <Redirect
              to={`/login`}
            />
        }
    />
  );
};
