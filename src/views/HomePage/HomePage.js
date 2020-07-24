import React, { useState, useEffect } from 'react';
import qs from "qs";
// Sections for this page
import LandingPage from "views/LandingPage/LandingPage.js";
import DashboardPage from "views/DashboardPage/DashboardPage.js";


export default function HomePage(props) {
  const [create, setCreate] = useState(false);

  useEffect( () => {
    function checkUrlParams() {
      const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });

      switch (params['po']) {
        case "create":
          setCreate(true);
          break;
        default:
          break;
      }
    };

    checkUrlParams();
  }, [props.location.search]);

  return (
    <div>
      {props.isAuthenticated
        ? <DashboardPage create={create} setCreate={setCreate} user={props.user} mobile={props.mobile} tablet={props.tablet} setTabTitle={props.setTabTitle}/>
        : <LandingPage />
      }
    </div>
  );
}
