
import HomeCenter from "@/components/HomeCenter/HomeCenter";
import HomeLeft from "@/components/HomeLeft/HomeLeft";
import HomeRight from "@/components/HomeRight/HomeRight";
// import ModalClient from "@/components/ModalClient/ModalClient";


// interface CardData {
//   // Define the structure of cardData here
//   // Example:
//   id: number;
//   title: string;
//   description: string;
// }

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[20%_80%] lg:grid-cols-[20%_60%_20%] ">

      {/* Left Section (Hidden on small screens) */}
      <HomeLeft />

      {/* Center Section (Scrollable) */}
      <HomeCenter />

     

      {/* Right Section (Hidden on small & medium screens) */}
      <HomeRight />

    </div>
  );
}
