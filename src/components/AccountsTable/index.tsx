import { Table, type TableColumnsType } from "antd";
import type { ReactElement } from "react";
import { type Account, filteredAccounts } from "../../pages/Accounts/mock";
import type { Filters } from "../../pages/Accounts/FilterModal";

const columns: TableColumnsType<Account> = [
  {
    title: "عنوان حساب",
    width: 70,
    dataIndex: "accountTitle",
    key: "accountTitle",
    // fixed: "right",
  },
  {
    title: "کد حساب",
    width: 40,
    dataIndex: "accountCode",
    key: "accountCode",
    // fixed: "right",
  },
  {
    title: "شماره حساب",
    dataIndex: "accountNumber",
    key: "accountNumber",
    width: 60,
  },
  {
    title: "شماره شبا",
    dataIndex: "ShebaNumber",
    key: "ShebaNumber",
    width: 80,
  },
  {
    title: "شماره کارت",
    dataIndex: "cardNumber",
    key: "cardNumber",
    width: 60,
  },
  {
    title: "وضعیت درگاه بانک",
    dataIndex: "bankPortStatus",
    key: "bankPortStatus",
    width: 50,
  },
  {
    title: "وضعیت کارتخوان",
    dataIndex: "posStatus",
    key: "posStatus",
    width: 50,
  },
  {
    title: "عملیات",
    dataIndex: "",
    key: "5",
    width: 50,
  },
];

interface Props {
  onSelectedChange: (keys: React.Key[]) => void;
  filters: Filters;
}

export default function AccountsTable({
  onSelectedChange,
  filters,
}: Props): ReactElement {
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      onSelectedChange(selectedRowKeys);
    },
  };
  return (
    <div dir="rtl" css="margin: 24px 0;">
      <Table
        rowSelection={{ type: "checkbox", ...rowSelection }}
        columns={columns}
        dataSource={filteredAccounts(filters)}
        scroll={{ x: 1600, y: 600 }}
      />
    </div>
  );
}
