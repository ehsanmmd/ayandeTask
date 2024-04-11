import type { PropsWithChildren, ReactElement } from "react";
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

export type EmptyObject = Record<never, never>;

const Icon = ({ children }: PropsWithChildren<EmptyObject>): ReactElement => {
  return <div style={{ fontSize: "18px" }}>{children}</div>;
};

const siderMenu: MenuProps["items"] = [
  {
    key: "dashboard",
    icon: (
      <Icon>
        <Dashboard />
      </Icon>
    ),
    label: "داشبورد",
  },
  {
    key: "users",
    icon: (
      <Icon>
        <Users />
      </Icon>
    ),
    label: "طرف حساب",
  },
  {
    key: "goods",
    icon: (
      <Icon>
        <Goods />
      </Icon>
    ),
    label: "کالا و خدمات",
  },
  {
    key: "store",
    icon: (
      <Icon>
        <Store />
      </Icon>
    ),
    label: "انبار داری",
  },
  {
    key: "sell",
    icon: (
      <Icon>
        <Sell />
      </Icon>
    ),
    label: "فروش",
  },
  {
    key: "treasury",
    icon: (
      <Icon>
        <Treasury />
      </Icon>
    ),
    label: "خزانه داری",
    children: [{ key: "newBankAccount", label: "تعریف حساب بانکی" }],
  },
  {
    key: "accounting",
    icon: (
      <Icon>
        <Accounting />
      </Icon>
    ),
    label: "حسابداری",
  },
  {
    key: "settings",
    icon: (
      <Icon>
        <Settings />
      </Icon>
    ),
    label: "تنظیمات",
  },
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
      <Sider
        width={280}
        dir="rtl"
        css=".ant-menu-item , .ant-menu-submenu-title {gap: 8px}"
      >
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
