import Header from "@/components/Header";
import React from "react";


const Settings = () => {
  const userSettings = {
    username: "John Smith",
    email: "john.smith@miro.com",
    teamName: "Miro Dev Team",
    roleName: "Staff Engineer",
  };

  const labelStyles = "block text-sm font-medium dark:text-white";
  const textStyle =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white";
  return (
    <div className="p-8">
      <Header name="Settings" />
      <div className="space-y-4">

        <div>
          <label className={labelStyles}>Username</label>
          <div className={textStyle}>{userSettings.username}</div>
        </div>

        <div>
          <label className={labelStyles}>Email</label>
          <div className={textStyle}>{userSettings.email}</div>
        </div>

        <div>
          <label className={labelStyles}>Team</label>
          <div className={textStyle}>{userSettings.teamName}</div>
        </div>

        <div>
          <label className={labelStyles}>Roles</label>
          <div className={textStyle}>{userSettings.roleName}</div>
        </div>


      </div>
    </div>
  );
};

export default Settings;
