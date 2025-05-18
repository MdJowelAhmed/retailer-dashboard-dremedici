import React, { useState, useRef, useEffect } from "react";
import { useGetSettingQuery } from "../../redux/apiSlices/setting";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const { data, isLoading: isLoadingSetting, isError } = useGetSettingQuery();

  const [termsContent, setTermsContent] = useState("");

  useEffect(() => {
    if (data?.privacyPolicy) {
      setTermsContent(data.privacyPolicy);
    }
  }, [data]);

  if (isLoadingSetting) return <p>Loading privacy policy...</p>;
  if (isError) return <p>Failed to load privacy policy.</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Privacy Policy</h2>
      </div>

      <div className="p-6 rounded-lg bg-primary">
        <div className="p-6 mt-6 bg-white border rounded-lg saved-content">
          <div
            dangerouslySetInnerHTML={{ __html: termsContent }}
            className="prose max-w-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
