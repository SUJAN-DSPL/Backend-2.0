"use client";
import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ThemeToggler from "@/components/ui/theme-toggler";

export default function Home() {

  return (
    <main className="flex">
      <div className="px-2">

      </div>
      
      <div>
        <div className=" absolute top-2 right-1">
          <ThemeToggler />
        </div>

        <p className="font-semibold text-xl text-muted-foreground">
          Good Morning, Dude
        </p>
      </div>
    </main>
  );
}
