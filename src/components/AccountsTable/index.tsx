import { Button, Table, type TableColumnsType } from "antd";
import { useEffect, useState, type ReactElement } from "react";
import { type Account, filteredAccounts } from "../../pages/Accounts/mock";
import type { Filters } from "../../pages/Accounts/FilterModal";

const columns: TableColumnsType<Account> = [
  {
    title: "عنوان حساب",
    dataIndex: "accountTitle",
    key: "accountTitle",
    fixed: "left",
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: "کد حساب",
    width: 100,
    dataIndex: "accountCode",
    key: "accountCode",
  },
  {
    title: "شماره حساب",
    dataIndex: "accountNumber",
    key: "accountNumber",
    width: 180,
  },
  {
    title: "شماره شبا",
    dataIndex: "ShebaNumber",
    key: "ShebaNumber",
    width: 220,
  },
  {
    title: "شماره کارت",
    dataIndex: "cardNumber",
    key: "cardNumber",
    width: 180,
  },
  {
    title: "وضعیت درگاه بانک",
    dataIndex: "bankPortStatus",
    key: "bankPortStatus",
  },
  {
    title: "وضعیت کارتخوان",
    dataIndex: "posStatus",
    key: "posStatus",
  },
  {
    title: "",
    dataIndex: "",
    key: "5",
  },
];

interface Props {
  onSelectedChange: (keys: React.Key[]) => void;
  filters: Filters;
  searchPhrase: string;
}

export default function AccountsTable({
  onSelectedChange,
  filters,
  searchPhrase,
}: Props): ReactElement {
  const [maxRows, setMaxRows] = useState(10);
  const [remaining, setRemaining] = useState<number | undefined>(undefined);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const data = filteredAccounts(filters, searchPhrase, maxRows);
    setAccounts(data.accounts);
    setRemaining(data.remaining);
  }, [maxRows, filters, searchPhrase]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      onSelectedChange(selectedRowKeys);
    },
  };

  const loadMore = () => {
    setMaxRows(prev => prev + prev);
  };

  return (
    <div dir="rtl" css="margin: 24px 0;">
      <Table
        rowSelection={{ type: "checkbox", ...rowSelection }}
        columns={columns}
        dataSource={accounts}
        scroll={{ x: 1200, y: 600 }}
        pagination={false}
      />
      {remaining && remaining > 0 && (
        <div css="display: flex">
          <Button
            type="link"
            onClick={loadMore}
            css="margin-top: 16px; margin: 16px auto"
          >
            مشاهده بیشتر
          </Button>
        </div>
      )}
    </div>
  );
}
