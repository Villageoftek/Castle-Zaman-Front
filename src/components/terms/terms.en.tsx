
export default function EnglishTerms({ agree, setAgree, englishContent }: { agree: boolean; setAgree: (value: boolean) => void, englishContent: string }) {
  return (
    <div className="my-8 px-8 w-full md:w-1/2">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      {/* <h2 className="text-xl mx-auto text-red-600 font-semibold mb-2 border border-dotted rounded-full border-red-600">
        this conditions is very important please read it carefully
      </h2> */}
      <h2 className="text-lg text-center text-red-600 font-semibold mb-2 px-2 py-2 border-2 border-dotted border-red-600 rounded-full w-full mx-auto">
        This condition is very important — please read it carefully.
      </h2>

      <p className="mb-4">Welcome to our restaurant! By using our services, you agree to the following terms and conditions:</p>
      {/* <ul className="list-disc pl-5 mb-4">
        <li>All orders must be placed in advance.</li>
        <li>We reserve the right to modify or cancel orders at any time.</li>
        <li>Payment is required at the time of order placement.</li>
        <li>Refunds are subject to our refund policy.</li>
      </ul> */}
      <div dangerouslySetInnerHTML={{ __html: englishContent }} />
      <p className="mb-4">For more details, please contact us directly.</p>

      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          id="agree"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="h-5 w-5"
        />
        <label htmlFor="agree" className="text-lg">I agree to the terms and conditions</label>
      </div>
    </div>
  );
};
