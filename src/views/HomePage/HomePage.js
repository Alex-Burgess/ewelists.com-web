import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import qs from "qs";
// libs
import { useAppContext } from "libs/contextLib";
// Sections for this page
import LandingPage from "views/LandingPage/LandingPage.js";
import DashboardPage from "views/DashboardPage/DashboardPage.js";


export default function HomePage(props) {
  const { isAuthenticated } = useAppContext();
  const { search } = useLocation();
  const [create, setCreate] = useState(false);

  useEffect( () => {
    function checkUrlParams() {
      const params = qs.parse(search, { ignoreQueryPrefix: true });

      if (params['create']) {
        setCreate(true);
      }
    };

    checkUrlParams();
  }, [search]);

  return (
    <div>
      {isAuthenticated
        ? <DashboardPage create={create} setCreate={setCreate} />
        : <LandingPage />
      }
    </div>
  );
}
