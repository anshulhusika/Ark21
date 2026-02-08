import { useState, useEffect } from "react";

const TermsPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("termsAccepted");

    if (!accepted) {
      setShow(true);
    }
  }, []);

  const acceptTerms = () => {
    localStorage.setItem("termsAccepted", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg overflow-y-auto max-h-[90vh]">

        <h2 className="text-xl font-bold mb-4 text-blue-700">
          Export Laws & Terms of Use
        </h2>

        <div className="text-sm text-gray-700 space-y-3">

          <p>
            Welcome to Ark21 Platform. Before using this website, you must agree to our export laws and trading policies.
          </p>

          <p>
            • Users must comply with all Indian export-import regulations.  
          </p>

          <p>
            • Prohibited items such as weapons, illegal substances, counterfeit goods, and restricted technologies must not be listed or traded.
          </p>

          <p>
            • Sellers are responsible for providing correct product information and legal documentation.
          </p>

          <p>
            • Buyers must ensure that purchased goods follow their country’s import rules.
          </p>

          <p>
            • Any misuse of this platform for illegal trading will result in permanent account suspension.
          </p>

          <p>
            • Ark21 is only a marketplace and not responsible for private agreements between buyers and sellers.
          </p>

          <p className="font-semibold">
            By clicking “I Agree”, you confirm that you understand and accept all terms and conditions.
          </p>

        </div>

        <div className="mt-6 text-right">
          <button
            onClick={acceptTerms}
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
          >
            I Agree
          </button>
        </div>

      </div>
    </div>
  );
};

export default TermsPopup;
