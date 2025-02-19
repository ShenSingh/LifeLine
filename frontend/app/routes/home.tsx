import type { Route } from "./+types/home";
import Dashboard from "../components/Dashboard";
import DashboardHeader from "../components/DashboardHeader";

import styled from 'styled-components';



export function meta({}: Route.MetaArgs) {
  return [
    { title: "LifeLine" },
    { name: "description", content: "Welcome to LifeLine" },
  ];
}

export default function Home() {
  return (
      <>
          <Dashboard />

      </>
  )
}
