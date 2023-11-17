"use client"; // If used in Pages Router, is no need to add "use client"

import React from "react";
import { ListEmployee } from "./employee/page";

export default function Home() {
  return <ListEmployee />;
}
