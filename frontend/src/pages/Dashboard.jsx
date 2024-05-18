import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardComp from "../components/DashboardComp";
import Payments from "../components/Payments";
import PaymentForm from "../components/PaymentForm";
import CreatePost from "./CreatePost";
import DashRegisterProperty from "../components/DashRegisterProperty";
import RegisterPropertyForm from "../components/RegisterPropertyForm";
import UserPropertiesList from "../components/UserPropertiesList";
import PropertyApproval from "../components/PropertyApproval";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile */}
      {tab === "profile" && <DashProfile />}
      {/* posts */}
      {tab === "posts" && <DashPosts />}
      {/* payment form */}
      {tab == "payment" && <PaymentForm/>}
      {/* Users */}
      {tab === "users" && <DashUsers/>}
      {/* Comments */}
      {tab === "comments" && <DashComments/>}
      {/* DashComp */}
      {tab === "dash" && <DashboardComp/>}
      {/* Create posts */}
      {tab === "create-post" && <CreatePost/>}
      {/* register property */}
      {tab == "register-property" && <RegisterPropertyForm/>}
      {/* property list */}
      {tab == "property-list" && <UserPropertiesList/>}
      {/* property approval */}
      {tab == "property-approval" && <PropertyApproval/>}

      {/* ... other components */}
      {tab === "payments" && <Payments />}
      {tab === "payment-form" && <PaymentForm />}
    </div>
  );
}
