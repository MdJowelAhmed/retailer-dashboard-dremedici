import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Button } from "antd";
import {
  useTermsAndConditionQuery,
  useUpdateTermsAndConditionsMutation,
} from "../../redux/apiSlices/termsAndConditionSlice";
import toast from "react-hot-toast";

const TermsAndCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { data: termsAndCondition, refetch } = useTermsAndConditionQuery();
  const [updateTermsAndConditions, { isLoading }] =
    useUpdateTermsAndConditionsMutation();

  // Function to save updated terms and conditions
  const saveTermsData = async () => {
    try {
      await updateTermsAndConditions({
        id: termsAndCondition?._id,
        description: content,
      })
        .unwrap()
        .then(({ statusCode, status, message }) => {
          if (status) {
            toast.success(message);
            refetch();
          }
        });
    } catch ({ message }) {
      toast.error(message || "Something Went Wrong");
    }
  };

  // Set the existing terms and conditions when data is available
  useEffect(() => {
    setContent(termsAndCondition?.description);
  }, [termsAndCondition]);

  return (
    <div className="bg-gradient-to-r from-primary to-secondary p-6 max-w-6xl mx-auto rounded-xl">
      <div className=" bg-white h-[700px] rounded-xl p-6 ">
        <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>

        <div className=" p-6 rounded-lg shadow-sm mb-6">
          {/* Default Terms and Conditions Content */}
          <p>
            <strong>Effective Date:</strong> [Insert Date]
          </p>
          <p>
            These Terms and Conditions ("Agreement") govern your use of our
            website and services. By using our platform, you agree to comply
            with these terms. Please read them carefully.
          </p>

          <h2 className="font-semibold mt-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the website, you agree to abide by these Terms
            and Conditions. If you do not agree with any part of these terms,
            you must not use the website or services.
          </p>

          <h2 className="font-semibold mt-4">2. Use of Services</h2>
          <p>
            We grant you a non-exclusive, non-transferable license to access and
            use our services as permitted by the platform. You must not use our
            services for any illegal or unauthorized purposes.
          </p>

          <h2 className="font-semibold mt-4">3. Privacy Policy</h2>
          <p>
            Your use of our services is also governed by our Privacy Policy,
            which outlines how we collect, use, and share your information.
          </p>

          <h2 className="font-semibold mt-4">4. Limitation of Liability</h2>
          <p>
            We are not liable for any indirect, incidental, or consequential
            damages resulting from your use of the services.
          </p>

          <h2 className="font-semibold mt-4">5. Changes to Terms</h2>
          <p>
            We may update these Terms and Conditions from time to time. All
            changes will be posted on this page with an updated effective date.
            Please review periodically.
          </p>

          <h2 className="font-semibold mt-4">6. Contact Us</h2>
          <p>
            If you have any questions regarding these Terms and Conditions,
            please contact us at [Insert Contact Email].
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;
