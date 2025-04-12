import "../../globals.css"
import GroupHeader from "./Component/GroupHeader";
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="bg-none">
        <GroupHeader></GroupHeader>
        {children}
      </div>
    );
  }
  