import { Button, Input, Popconfirm } from "antd";
import { useState, type ReactElement } from "react";
import { styled } from "styled-components";
import {
  Camera,
  Delete,
  Excel,
  Filter,
  Pdf,
  Plus,
  Printer,
} from "../../components/appIcons";
import AccountsTable from "../../components/AccountsTable";
import { deleteAccounts } from "./mock";
import FilterModal, { type Filters } from "./FilterModal";

const { Search } = Input;

const Container = styled.div``;

const TableHeading = styled.div``;
const Title = styled.h1``;
const Description = styled.div`
  font-size: 16px;
  font-weight: 400;
`;
const UpperHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LowerHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ActionButton = styled(Button)`
  height: 40px;
  svg {
    font-size: 20px;
  }
`;

const TableContainer = styled.div``;

export default function Accounts(): ReactElement {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    portFilter: "همه",
    posFilter: "همه",
  });

  const deleteEntries = () => {
    deleteAccounts(selectedKeys as string[]);
    setSelectedKeys([]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = (filters: Filters) => {
    setFilters(filters);
    setIsModalOpen(false);
  };

  return (
    <>
      <Container>
        <TableHeading>
          <UpperHeading css="margin-bottom: 32px;">
            <div css="display:flex; align-items: center; gap: 8px">
              <Button icon={<Camera />}>آموزش ویدیویی </Button>
              <Button icon={<Pdf />}></Button>
            </div>
            <div dir="rtl">
              <Title>تعریف حساب بانکی</Title>
              <Description>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است.
              </Description>
            </div>
          </UpperHeading>
          <LowerHeading>
            <HeaderActions>
              <ActionButton
                type="primary"
                css="display: flex; align-items: center; gap: 8px;"
              >
                حساب جدید
                <Plus />
              </ActionButton>
              <div dir="rtl">
                <Popconfirm
                  title="حذف حساب"
                  description="آیا از حذف حساب اطمینان دارید؟"
                  onConfirm={deleteEntries}
                  onCancel={() => {}}
                  okText="حذف کن"
                  cancelText="انصراف"
                >
                  <ActionButton disabled={selectedKeys.length === 0}>
                    <Delete />
                  </ActionButton>
                </Popconfirm>
              </div>
              <ActionButton>
                <Excel />
              </ActionButton>
              <ActionButton>
                <Printer />
              </ActionButton>
            </HeaderActions>
            <HeaderActions>
              <ActionButton onClick={() => setIsModalOpen(true)}>
                <Filter />
              </ActionButton>
              <Search dir="rtl" placeholder="جستجو" size="large" />
            </HeaderActions>
          </LowerHeading>
        </TableHeading>
        <TableContainer>
          <AccountsTable onSelectedChange={setSelectedKeys} filters={filters} />
        </TableContainer>
      </Container>
      <FilterModal
        handleCancel={handleCancel}
        handleOk={handleOk}
        isModalOpen={isModalOpen}
        currentFilters={filters}
      />
    </>
  );
}
