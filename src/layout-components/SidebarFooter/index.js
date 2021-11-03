import React from 'react';

import { UncontrolledTooltip } from 'reactstrap';

import { Bell } from 'react-feather';
import { NavLink } from 'react-router-dom';

const SidebarFooter = () => {
  return (
    <>
      <div className="app-sidebar--footer">
        <ul>
          <li>
            <NavLink
              to="/Overview"
              className="btn btn-sm btn-transition-none px-2 mx-2"
              id="OverviewDashboardTooltip123">
              <Bell />
            </NavLink>
            <UncontrolledTooltip
              target="OverviewDashboardTooltip123"
              container=".app-sidebar--footer">
              Overview Dashboard
            </UncontrolledTooltip>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidebarFooter;
