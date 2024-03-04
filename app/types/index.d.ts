"use client"

export type ServerTypes = {
  server: {
    name: string;
    cpu_current: number;
    cpu: Array<{ date: string; value: string }>;
    memory_current: string;
    memory_total: string;
    memory_status: "critical" | "normal";
    storage_current: string;
    storage_total: string;
    storage_status: "critical" | "normal";
    storage: {
      directory: "/";
      total: number;
      used: number;
    };
    database_total: string;
    database_type: string;
    database_name: string;
    updated_at: string;
    recently_reported: boolean;
  };
  time: number;
  runAt: string;
};
