import { DownOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, type MenuProps, Modal, Space } from "antd";
import { type ReactElement, useState } from "react";
import styled from "styled-components";

type ConnectionFilter = "همه" | "متصل" | "غیر متصل";
export interface Filters {
  posFilter: ConnectionFilter;
  portFilter: ConnectionFilter;
}
interface Props {
  isModalOpen: boolean;
  currentFilters: Filters;
  handleOk: (filters: Filters) => void;
  handleCancel: () => void;
}

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  Button {
    flex: 1;
  }
`;

const Label = styled.div`
  margin: 8px 0;
`;

const StyledDropdown = styled(Dropdown)`
  width: 100%;
  div {
    display: flex;
    justify-content: space-between;
  }
`;

export default function FilterModal({
  handleCancel,
  handleOk,
  isModalOpen,
  currentFilters,
}: Props): ReactElement {
  const [posFilterState, setPosFilterState] = useState<ConnectionFilter>(
    currentFilters.posFilter,
  );
  const [portFilterState, setPortFilterState] = useState<ConnectionFilter>(
    currentFilters.portFilter,
  );

  const onConfirmClick = () => {
    handleOk({ portFilter: portFilterState, posFilter: posFilterState });
  };

  const filterItems: MenuProps["items"] = [
    {
      label: "همه",
      key: "همه",
    },
    {
      label: "متصل",
      key: "متصل",
    },
    {
      label: "غیر متصل",
      key: "غیر متصل",
    },
  ];

  const onPosFilterClick: MenuProps["onClick"] = info => {
    setPosFilterState(info.key as ConnectionFilter);
  };

  const onPortFilterClick: MenuProps["onClick"] = info => {
    setPortFilterState(info.key as ConnectionFilter);
  };

  const posFilterItemsProps = {
    items: filterItems,
    onClick: onPosFilterClick,
  };

  const portFilterItemsProps = {
    items: filterItems,
    onClick: onPortFilterClick,
  };

  return (
    <Modal
      css="direction: rtl"
      width={350}
      title="فیلتر ها"
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
    >
      <div>
        <Divider />
        <div>
          <Label>وضعیت کارتخوان</Label>
          <StyledDropdown
            menu={posFilterItemsProps}
            overlayStyle={{ direction: "rtl" }}
          >
            <Button>
              <Space>
                {posFilterState}
                <DownOutlined />
              </Space>
            </Button>
          </StyledDropdown>
        </div>
        <Divider />
        <div>
          <Label>وضعیت درگاه</Label>
          <StyledDropdown
            menu={portFilterItemsProps}
            overlayStyle={{ direction: "rtl" }}
          >
            <Button>
              <Space>
                {portFilterState}
                <DownOutlined />
              </Space>
            </Button>
          </StyledDropdown>
        </div>
        <a>
          <div css="margin: 16px 0">حذف همه فیلتر ها</div>
        </a>
        <Divider />
        <Actions>
          <Button type="primary" onClick={onConfirmClick}>
            تایید
          </Button>
          <Button>انصراف</Button>
        </Actions>
      </div>
    </Modal>
  );
}
