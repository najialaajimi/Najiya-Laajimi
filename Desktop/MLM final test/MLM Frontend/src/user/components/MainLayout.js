import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { BsPersonFill , BsClockHistory } from "react-icons/bs";
import { MdOutlineCompare, MdFavorite , MdLibraryAdd} from "react-icons/md";
import {HiShoppingBag ,HiOutlineTicket} from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { TbCalendarEvent , TbStarsFilled} from "react-icons/tb";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  
  const authState = useSelector(state => state.auth)

  const handleLogout= () => {
    localStorage.clear();
    /* window.location.reload()
    navigate('/') */
  window.location.href = "/";
  }
  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo"><img src="/images/Logo.png" className="mlmlogo_admin" width={35} alt="" /></span>
            <span className="lg-logo">
            <img src="/images/Logo.png" className="mlmlogo_admin me-2" width={35} alt="" />
              Altiso Marketing
</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Table de Board",
            },
            {
              key: "adherant",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Adherant",
            },
            {
              key: "product",
              icon: <HiShoppingBag className="fs-4" />,
              label: "Produit",
            },
            {
              key: "achat",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Achats",
            },
            {
              key: "favoris",
              icon: <MdFavorite className="fs-4" />,
              label: "Favoris",
            },
            {
              key: "star",
              icon: <TbStarsFilled className="fs-4" />,
              label: "Meilleur Produit",
            },
            {
              key: "event",
              icon: <TbCalendarEvent className="fs-4" />,
              label: "Salle d'événement",
            },
            {
              key: "tiket",
              icon: <HiOutlineTicket className="fs-4" />,
              label: "Tiket",
              children: [
                {
                  key: "add-tiket",
                  icon: <MdLibraryAdd className="fs-4" />,
                  label: "Ajouter Tiket",
                },
                {
                  key: "list-tiket",
                  icon: <FaClipboardList className="fs-4" />,
                  label: "Liste Tiket",
                },
              ],
            },
            {
              key: "hcommande",
              icon: <BsClockHistory className="fs-4" />,
              label: "Historique Commande",
            },
            {
              key: "compte",
              icon: <BsPersonFill className="fs-4" />,
              label: "Mon Compte",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-2" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
              <BsPersonFill className="fs-2" />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">{authState?.user?.firstname}</h5>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Voir site
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    onClick={handleLogout}
                  >
                    Signout
                  </button>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
