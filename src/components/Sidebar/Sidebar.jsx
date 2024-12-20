import React, { useState } from "react";
import { UserProfile } from "./UserProfile";
import { SidebarGroup } from "./SidebarGroup";
import { navigationGroups } from "./data";

export function Sidebar() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="flex overflow-hidden flex-col p-4 bg-white rounded-md border border-solid border-stone-300 w-[270px]">
      <UserProfile />
      {navigationGroups.map((group) => (
        <SidebarGroup
          key={group.id}
          {...group}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      ))}
    </div>
  );
}
