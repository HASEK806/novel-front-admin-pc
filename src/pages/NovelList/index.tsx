import React, { useState } from 'react';
import { Button, Table, Input, Form, Space, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import NovelForm from './components/novelForm';
import './index.less';


const NovelList: React.FC = () => {
  // Mock 数据
  const [dataSource, setDataSource] = useState<any[]>([
    { id: 1, cover: 'https://via.placeholder.com/50', title: '小说 A', author: '作者 A', description: '描述 A' },
    { id: 2, cover: 'https://via.placeholder.com/50', title: '小说 B', author: '作者 B', description: '描述 B' },
  ]);

  const [query, setQuery] = useState({ title: '', author: '' });
  const [loading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNovel, setCurrentNovel] = useState<any>(null);

  // 查询表单
  const onSearch = () => {
    message.info('查询功能暂未实现');
  };

  const onReset = () => {
    setQuery({ title: '', author: '' });
  };

  // 新建
  const handleNew = () => {
    setCurrentNovel(null); // 清空当前编辑的小说信息
    setIsModalOpen(true);
  };

  // 编辑
  const handleEdit = (record: any) => {
    setCurrentNovel(record); // 设置当前编辑的小说信息
    setIsModalOpen(true);
  };

  // 删除
  const handleDelete = (id: number) => {
    setDataSource((prev) => prev.filter((item) => item.id !== id));
    message.success('删除成功');
  };

  // 保存（新建或修改）
  const handleSave = (values: any) => {
    if (currentNovel) {
      // 修改
      setDataSource((prev) =>
        prev.map((item) => (item.id === currentNovel.id ? { ...item, ...values } : item))
      );
      message.success('修改成功');
    } else {
      // 新建
      setDataSource((prev) => [
        ...prev,
        { id: prev.length + 1, cover: values.cover || '', ...values },
      ]);
      message.success('新建成功');
    }
    setIsModalOpen(false);
  };

  // 表格列
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 50, align: 'center' as 'center' },
    {
      title: '封面图',
      dataIndex: 'cover',
      key: 'cover',
      align: 'center' as 'center', 
      render: (cover: string) => <img src={cover} alt="封面" style={{ width: 50, height: 50 }} />,
    },
    { title: '书名', dataIndex: 'title', align: 'center' as 'center', key: 'title' },
    { title: '作者', dataIndex: 'author', align: 'center' as 'center',key: 'author' },
    { title: '描述', dataIndex: 'description', align: 'center' as 'center', key: 'description' },
    {
      title: '操作',
      key: 'action',
      align: 'center' as 'center',
      render: (_: any, record: any) => (
        <Space>
          <span className="action-span" onClick={() => handleEdit(record)}>
            修改
          </span>
          <span className="action-span" onClick={() => handleDelete(record.id)}>
            删除
          </span>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Form className='check-form' layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item className='content-width' label="书名">
          <Input
            value={query.title}
            onChange={(e) => setQuery({ ...query, title: e.target.value })}
            placeholder="请输入书名"
            allowClear
          />
        </Form.Item>
        <Form.Item className='content-width' label="作者">
          <Input
            value={query.author}
            onChange={(e) => setQuery({ ...query, author: e.target.value })}
            placeholder="请输入作者"
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onSearch}>
            查询
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={onReset}>重置</Button>
        </Form.Item>
      </Form>

      <Button type="primary" icon={<PlusOutlined />} onClick={handleNew} style={{ marginBottom: 16, float: 'right' }}>
        新建
      </Button>

      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 1, // 每页显示 10 条数据
          showTotal: (total) => `总计 ${total} 条数据`, // 显示总数据量
        }}
      />

      {/* 新建/修改弹窗 */}
      <Modal
        title={currentNovel ? '修改小说信息' : '新建小说信息'}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <NovelForm
          initialValues={currentNovel}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default NovelList;
