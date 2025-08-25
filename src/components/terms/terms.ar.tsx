export default function ArabicTerms({ agree, setAgree, arabicContent }: { agree: boolean; setAgree: (value: boolean) => void, arabicContent: string }) {
  return (
    <div className="my-8 px-8 w-full md:w-1/2 " dir="rtl">
      <h1 className="text-3xl font-bold mb-4">الشروط والأحكام</h1>
       <h2 className="text-lg w-full text-center text-red-600 font-semibold mb-2 px-2 py-2 border-2 border-dotted border-red-600 rounded-full  mx-auto">
        هذه الشروط مهمة جدًا - يرجى قراءتها بعناية.
      </h2>
      <p className="mb-4">أهلاً بكم في مطعمنا! باستخدام خدماتنا، فإنك توافق على الشروط والأحكام التالية:</p>
      {/* <ul className="list-disc pl-5 mb-4">
          <li>يجب تقديم جميع الطلبات مسبقًا.</li>
          <li>نحتفظ بالحق في تعديل أو إلغاء الطلبات في أي وقت.</li>
          <li>يجب الدفع عند تقديم الطلب.</li>
          <li>تخضع عمليات استرداد الأموال لسياسة الاسترداد الخاصة بنا.</li>
        </ul> */}
      <div dangerouslySetInnerHTML={{ __html: arabicContent }} />
      <p className="mb-4">لمزيد من التفاصيل، يرجى الاتصال بنا مباشرة.</p>

      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          id="agree"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="h-5 w-5"
        />
        <label htmlFor="agree" className="text-lg">أوافق على الشروط والأحكام</label>
      </div>
    </div>
  );
};
