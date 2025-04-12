import "../../../globals.css"
import MemberTab from "./component/MemberTab";
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen bg-white shadow-md rounded-lg p-4">
        <MemberTab></MemberTab>
        {children}
      </div>
    );
  }