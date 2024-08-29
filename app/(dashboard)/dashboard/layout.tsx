import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      DashboardHeader
      <body>{children}</body>
    </html>
  );
};

export default DashboardLayout;
