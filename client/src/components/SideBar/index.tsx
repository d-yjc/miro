"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetAuthUserQuery, useGetProjectsQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  BriefcaseIcon,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const SideBar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const { data: projects } = useGetProjectsQuery();

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const { data: currentUser } = useGetAuthUserQuery({}); //data from user!
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error occurred while attempting to sign out:", error);
    }
  };
  if (!currentUser) {
    return null;
  }
  const currentUserDetails = currentUser?.userDetails;

  const sidebarClass = `fixed flex flex-col h-full justify-between shadow-xl
    transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white 
    ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;
  return (
    <div className={sidebarClass}>
      <div className="flex h-full w-full flex-col justify-start">
        {/*top logo*/}
        <div className="z-50 flex min-h-[56] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            MIRO
          </div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
              }}
            >
              <X className="size-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        {/*team*/}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image
            src="https://miro-s3-images.s3.us-east-1.amazonaws.com/logo.png"
            alt="Logo"
            width={40}
            height={40}
          />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              MIRO TEAM
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] size-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* Navbar links*/}
        <nav className="z-10 w-full">
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
          <SidebarLink icon={Search} label="Search" href="/search" />
          <SidebarLink icon={Settings} label="Settings" href="/settings" />
          <SidebarLink icon={User} label="Users" href="/users" />
          <SidebarLink icon={Users} label="Teams" href="/teams" />
        </nav>
        {/*project links*/}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUp className="size-5" />
          ) : (
            <ChevronDown className="size-5" />
          )}
        </button>
        {/*Project Lists */}
        {showProjects &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              icon={BriefcaseIcon}
              label={project.name}
              href={`/projects/${project.id}`}
            />
          ))}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Priorities</span>
          {showPriority ? (
            <ChevronUp className="size-5" />
          ) : (
            <ChevronDown className="size-5" />
          )}
        </button>
        {showPriority && (
          <>
            <SidebarLink
              icon={AlertOctagon}
              label="Urgent"
              href="/priority/urgent"
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
            />
            <SidebarLink icon={AlertCircle} label="Low" href="/priority/low" />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
            />
          </>
        )}
      </div>
      <div>
        <div className="z-10 mt-32 flex w-full flex-col items-center gap-4 bg-white px-8 py-4 md:hidden dark:bg-black">
          <div className="flex w-full items-center">
            <div className="align-center flex size-9 justify-center">
              {!!currentUserDetails?.profilePictureUrl ? (
                <Image
                  src={`https://miro-s3-images.s3.us-east-1.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
                  alt={currentUserDetails?.username || "User Profile Picture"}
                  width={100}
                  height={50}
                  className="h-full rounded-full object-cover"
                />
              ) : (
                <User className="size-6 cursor-pointer self-center rounded-full dark:text-white" />
              )}
            </div>
            <span className="mx-3 text-gray-800 dark:text-white">
              {currentUserDetails?.username}
            </span>
            <button
              className="text-s self-start rounded bg-blue-400 px-4 py-2 font-bold text-white hover:bg-blue-500 md:block"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}
const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        } justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute top-0 left-0 h-full w-[5px] bg-blue-200" />
        )}
        <Icon className="size-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default SideBar;
