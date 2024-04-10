import type { ReactElement } from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Avatar,
  Breadcrumb,
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
} from "antd";
import { Logo } from "../../components/logo";
import { styled } from "styled-components";
import {
  Accounting,
  Bell,
  Dashboard,
  Goods,
  Sell,
  Settings,
  SmartPhone,
  Store,
  Treasury,
  Users,
} from "../../components/appIcons";
import LiveDateTime from "./LiveDateTime";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider } = Layout;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: Yekan Bakh FaNum;
  font-size: 24px;
  font-weight: 700;
  line-height: 34px;
`;

const siderMenu: MenuProps["items"] = [
  { key: "dashboard", icon: <Dashboard />, label: "داشبورد" },
  { key: "users", icon: <Users />, label: "طرف حساب" },
  { key: "goods", icon: <Goods />, label: "کالا و خدمات" },
  { key: "store", icon: <Store />, label: "انبار داری" },
  { key: "sell", icon: <Sell />, label: "فروش" },
  {
    key: "treasury",
    icon: <Treasury />,
    label: "خزانه داری",
    children: [{ key: "newBankAccount", label: "تعریف حساب بانکی" }],
  },
  { key: "accounting", icon: <Accounting />, label: "حسابداری" },
  { key: "settings", icon: <Settings />, label: "تنظیمات" },
];

const yearMenuItems: MenuProps["items"] = [
  {
    label: "سال مالی ۱۴۰۲",
    key: "1",
    icon: <UserOutlined />,
  },
];

const yearMenuProps = {
  items: yearMenuItems,
  onClick: () => {},
};

export default function AppLayout(): ReactElement {
  const navigate = useNavigate();
  const sideMenuHandler: MenuProps["onSelect"] = info => {
    if (info.key === "newBankAccount") {
      navigate("accounts");
    }
  };
  return (
    <Layout>
      <Layout>
        <Header css="display: flex; justify-content: space-between; align-items: center; background: white; border: 1px solid #eee; height: 110px">
          <div css="display: flex; align-items: center; gap: 16px;">
            <Avatar src="userImage.png" size={46} />
            <Bell css="font-size: 24px;" />
            <SmartPhone css="font-size: 24px;" />
            <Dropdown menu={yearMenuProps}>
              <Button>
                <Space>
                  سال مالی ۱۴۰۲
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          <div>
            <LiveDateTime />
          </div>
        </Header>
        <div css="padding: 16px 24px;">
          <div dir="rtl" css="margin-bottom: 16px;">
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <Dashboard />
              </Breadcrumb.Item>
              <Breadcrumb.Item>خزانه داری</Breadcrumb.Item>
              <Breadcrumb.Item>تعریف حساب بانکی</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Outlet />
        </div>
      </Layout>
      <Sider width={279} dir="rtl">
        <LogoContainer css="margin: 32px">
          <Logo css="font-size: 32px" />
          ثمینا
        </LogoContainer>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          css="height: 100%; borderRight: 0; font-size: 16px; font-weight: 600;"
          items={siderMenu}
          onSelect={sideMenuHandler}
        />
      </Sider>
    </Layout>
  );
}
