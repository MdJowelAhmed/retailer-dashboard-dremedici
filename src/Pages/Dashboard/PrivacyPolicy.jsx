import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Button } from "antd";
import {
  usePrivacyPolicyQuery,
  useUpdatePricyPolicyMutation,
} from "../../redux/apiSlices/privacyPolicySlice";
import toast from "react-hot-toast";
import GradientButton from "../../components/common/GradiantButton";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { data: privacyPolicy, refetch } = usePrivacyPolicyQuery();
  const [updatePricyPolicy, { isLoading }] = useUpdatePricyPolicyMutation();

  const aboutDataSave = async () => {
    try {
      await updatePricyPolicy({ id: privacyPolicy?._id, description: content })
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

  useEffect(() => {
    setContent(privacyPolicy?.description);
  }, [privacyPolicy]);

  return (
    <div className="bg-gradient-to-r from-primary to-secondary p-6 max-w-6xl mx-auto rounded-xl">
      <div className=" bg-white h-[700px] rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <div className=" p-6 rounded-lg shadow-sm mb-6">
          <p>
            <strong>Effective Date:</strong> [Insert Date]
          </p>
          <p>
            At [Your Company Name], we are committed to protecting your privacy.
            This Privacy Policy outlines how we collect, use, and share your
            personal information when you use our services.
          </p>

          <h2 className="font-semibold mt-4">1. Information We Collect</h2>
          <ul className="list-disc pl-5">
            <li>
              Personal Identification Information: When you use our services, we
              may collect information such as your name, email address, phone
              number, and payment information.
            </li>
            <li>
              Usage Data: We may collect information about how you use our
              website or application, such as browsing patterns, clicks, and
              time spent on pages.
            </li>
            <li>
              Cookies: We use cookies to enhance user experience, analyze usage,
              and track preferences.
            </li>
          </ul>

          <h2 className="font-semibold mt-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5">
            <li>To provide, maintain, and improve our services.</li>
            <li>
              To communicate with you, including sending you notifications,
              updates, and marketing materials (if you opt-in).
            </li>
            <li>
              To process transactions and manage your subscriptions or
              purchases.
            </li>
            <li>
              To analyze usage data for improving user experience and
              functionality.
            </li>
          </ul>

          <h2 className="font-semibold mt-4">3. Sharing Your Information</h2>
          <ul className="list-disc pl-5">
            <li>
              Service Providers: We may share information with third-party
              vendors and service providers who assist us in operating our
              website or app, processing payments, or providing other services.
            </li>
            <li>
              Legal Requirements: We may disclose information if required by
              law, such as complying with a subpoena, legal process, or
              government request.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
