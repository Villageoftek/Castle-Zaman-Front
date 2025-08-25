import ArabicTerms from "@/components/terms/terms.ar";
import EnglishTerms from "@/components/terms/terms.en";
import { useState } from "react";
import { useNavigate } from "react-router";
import useTermsQuery from "../queres/terms";
import { useEffect } from "react";
export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [agree, setAgree] = useState(false);
  const to = useNavigate();
  const { data: terms } = useTermsQuery();
  // console.log(terms);
  const englishContent = terms?.translations[0].content;
  const arabicContent = terms?.translations[1].content;
  // console.log("Terms data:", englishContent, arabicContent);
  return (
    <div className="">
      <div className="flex flex-col md:flex-row items-start md:items-stretch //divide-y md:divide-x divide-gray-300 dark:divide-gray-700 ">
        <EnglishTerms
          englishContent={englishContent}
          agree={agree}
          setAgree={setAgree} />

        <ArabicTerms
          arabicContent={arabicContent}
          agree={agree}
          setAgree={setAgree} />
      </div>
      <div className="flex items-center justify-between gap-8 my-12 px-12">
        <button type="button" onClick={() => to("/")} className="py-1.5 px-4 rounded-md text-lg font-medium bg-blue-700 hover:bg-blue-800 text-slate-100 transition-all">Go Back</button>
        <button type="button" disabled={!agree} onClick={() => to("/review")} className="py-1.5 px-4 rounded-md text-lg font-medium bg-blue-700 hover:bg-blue-800 text-slate-100 transition-all ml-auto">Next</button>
      </div>
    </div>
  );
};
