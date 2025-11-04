import ActiveIdcard from "./ActiveIdcard";
import NoIdcard from "./NoIdcard";
import React, { useEffect, useState } from "react";
import { idcardService } from "../Services/idcardService";

export const Idcard = () => {
  const [isActive, setIsActive] = useState(null);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const checkStatus = async () => {
      if (!userId) return;
      const applied = await idcardService.isActive(userId);
      setIsActive(applied);
    };
    checkStatus();
  }, [userId]);

  if (isActive == null) {
    return <div>Loading...</div>;
  }
  return <div>{isActive ? <ActiveIdcard /> : <NoIdcard />}</div>;
};
export default Idcard;
