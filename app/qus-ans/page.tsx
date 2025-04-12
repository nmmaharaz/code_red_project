


import axios from "axios";
import QuestionTable from "@/components/QuestionBox/QuestionTable/QuestionTable";
import QuestionTableTrending from "@/components/QuestionBox/QuestionTableTrending/QuestionTableTrending";



const fetchPostedData = async () => {
  try {
    const { data: postedData } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/question`);
    return postedData
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export default async function DevQuestions() {
  const cardData = await fetchPostedData()




  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[78%_20%] gap-2.5">
        {/* Left side */}
        {/* {loading ? (<Loading />) : (
          <QuestionTable
            cardData={cardData}
          />
        )} */}
        <QuestionTable
          cardData={cardData}
        />

        <QuestionTableTrending cardData={cardData} />
      </div>
    </>
  );
}
