import { idcardService } from "../Services/idcardService";
import MembershipApplication from "./MembershipApplication";
import Membershipstatus from "./Membershipstatus";
import React, { useEffect, useState } from "react";

export const Membership = () => {
  const [isApply, setIsApply] = useState(null);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchStatus = async () => {
      if (!userId) return;
      const applied = await idcardService.checkStatus(userId);
      setIsApply(applied);
    };
    fetchStatus();
  }, [userId]);

  if (isApply == null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isApply ? (
        <Membershipstatus />
      ) : (
        <MembershipApplication onSubmitSuccess={() => setIsApply(true)} />
      )}
    </div>
  );
};
export default Membership;
