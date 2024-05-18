import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { FaClipboardList, FaMoneyBillAlt } from "react-icons/fa";
import { VscReport } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdCreate } from "react-icons/md";
import { RiFolderHistoryFill } from "react-icons/ri";

function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {}
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
              active={tab === 'dash' || !tab}
              icon={HiChartPie}
              as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>

          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=create-post">
              <Sidebar.Item
              active={tab === "create"}
              icon={MdCreate}
              as='div'
              >
                Create Post
              </Sidebar.Item>
            </Link>
          )}


          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=users">
            <Sidebar.Item
            active={tab === "users"}
            icon={HiOutlineUserGroup}
            as='div'
            >
              Users
            </Sidebar.Item>
            </Link>
          )}

          

          {currentUser && (
            <Link to='/dashboard?tab=payments'>
              <Sidebar.Item
              active={tab === 'payments'}
              icon={RiFolderHistoryFill}
              as='div'
              >
                Payments History
              </Sidebar.Item>
            </Link>
          )}
          
          {currentUser.isAdmin == false && (
            <Link to="/dashboard?tab=payment">
              <Sidebar.Item
                active={tab === "payment"}
                icon={FaMoneyBillAlt}
                as="div"
              >
                Payment
              </Sidebar.Item>
            </Link>
          )}

{currentUser.isAdmin == false && (
            <Link to="/dashboard?tab=register-property">
              <Sidebar.Item
                active={tab === "register-property"}
                icon={ FaClipboardList}
                as="div"
              >
              Register Property
              </Sidebar.Item>
            </Link>
          )}

{currentUser.isAdmin == false && (
            <Link to="/dashboard?tab=property-list">
              <Sidebar.Item
                active={tab === "property-list"}
                icon={ FaClipboardList}
                as="div"
              >
              Property List
              </Sidebar.Item>
            </Link>
          )}

{currentUser.isAdmin && (
            <Link to="/dashboard?tab=property-approval">
            <Sidebar.Item
            active={tab === "property-approval"}
            icon={HiOutlineUserGroup}
            as='div'
            >
              Approval
            </Sidebar.Item>
            </Link>
          )}
          
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
