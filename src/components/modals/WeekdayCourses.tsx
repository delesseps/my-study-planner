import React, { useState } from "react";
import { Modal, Table, Input, Popconfirm, Form } from "antd";
import styled from "styled-components";
import { toTitleCase } from "utils";
import { WrappedFormUtils } from "antd/lib/form/Form";

const EditableContext = React.createContext<WrappedFormUtils | undefined>(
  undefined
);

interface IEditableRowProps {
  form: WrappedFormUtils;
  index: number;
}

const EditableRow: React.FC<IEditableRowProps> = ({
  form,
  index,
  ...props
}) => (
  <EditableContext.Provider value={form}>
    <TableRow {...props} />
  </EditableContext.Provider>
);

const TableRow = styled.tr`
  background-color: ${({ theme }) => theme.tableCellBackgroundColor};
`;

const EditableFormRow = Form.create()(EditableRow);

interface IEditableCellProps {
  record: any;
  handleSave: Function;
  index: number;
  dataIndex: string;
  title: string;
  editable: boolean;
}

class EditableCell extends React.Component<IEditableCellProps> {
  form: WrappedFormUtils | undefined;
  input: any;

  state = {
    editing: false
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = (e: React.SyntheticEvent) => {
    const { record, handleSave } = this.props;
    this.form?.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = (form: WrappedFormUtils | undefined) => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form?.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`
            }
          ],
          initialValue: record[dataIndex]
        })(
          <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </Form.Item>
    ) : (
      <Cell onClick={this.toggleEdit}>{children}</Cell>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

const Cell = styled.div`
  padding: 0.5rem 1.2rem;
  padding-right: 2.4rem;
  cursor: pointer;

  &:hover {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    padding: 0.5rem 1.2rem;
  }
`;

interface INewCourseModalProps {
  weekday: string;
  visible: boolean;
  setVisible: Function;
}

const WeekdayCoursesModal: React.FunctionComponent<INewCourseModalProps> = ({
  weekday,
  visible,
  setVisible
}) => {
  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      name: "Edward King 0",
      age: "32",
      address: "London, Park Lane no. 0"
    },
    {
      key: "1",
      name: "Edward King 1",
      age: "32",
      address: "London, Park Lane no. 1"
    }
  ]);
  const [count, setCount] = useState(2);

  const columns = [
    {
      title: "Subject",
      dataIndex: "name",
      width: "30%",
      editable: true
    },
    {
      title: "Starts",
      dataIndex: "age"
    },
    {
      title: "Ends",
      dataIndex: "address"
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (text: string, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null
    }
  ];

  const handleClose = () => setVisible(false);

  const handleDelete = (key: string) => {
    const newDataSource = [...dataSource];
    setDataSource(newDataSource.filter(item => item.key !== key));
  };

  const handleAdd = () => {
    const newData = {
      key: `${count}`,
      name: `Edward King ${count}`,
      age: "32",
      address: `London, Park Lane no. ${count}`
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: any) => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell
    }
  };

  const newColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave
      })
    };
  });

  return (
    <StyledModal
      width={600}
      style={{
        position: "relative"
      }}
      visible={visible}
      footer={null}
      onCancel={handleClose}
    >
      <Wrapper>
        <Title>{weekday && toTitleCase(weekday)} Courses</Title>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={newColumns}
        />
      </Wrapper>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  & .ant-modal-content {
    background-color: ${props => props.theme.backgroundColor};
  }
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h1`
  font-weight: bold;
  font-weight: 2.2rem;
`;

export default WeekdayCoursesModal;
