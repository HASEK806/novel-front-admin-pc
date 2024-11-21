import React, { useState, useEffect } from 'react';
import { Button, Table, Input, Form, Space, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import NovelForm from './components/novelForm';
import './index.less';
import { getBooks, deleteBook, createBook, updateBook } from '@/services/api';

const NovelList: React.FC = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [query, setQuery] = useState({ title: '', author: '' });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNovel, setCurrentNovel] = useState<any>(null);

  // 获取小说列表
  const fetchNovels = async () => {
    setLoading(true);
    try {
      const response = await getBooks(query); // 调用查询接口，传递查询条件
      setDataSource(response); // 直接将返回的数组赋值给 dataSource
    } catch (error) {
      message.error('获取小说列表失败');
    } finally {
      setLoading(false);
    }
  };
   
  useEffect(() => {
    fetchNovels(); // 页面加载时获取小说列表
  }, [query]); // 查询条件变化时重新加载数据

  // 查询表单
  const onSearch = () => {
    fetchNovels();
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
  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id); // 调用删除接口
      message.success('删除成功');
      fetchNovels(); // 重新加载列表
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 保存（新建或修改）
  const handleSave = async (values: any) => {
    try {
      if (currentNovel) {
        // 修改
        await updateBook(currentNovel.id, values); // 调用更新接口
        message.success('修改成功');
      } else {
        // 新建
        await createBook(values); // 调用新建接口
        message.success('新建成功');
      }
      setIsModalOpen(false);
      fetchNovels(); // 重新加载列表
    } catch (error) {
      message.error('保存失败');
    }
  };

  // 表格列
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 50, align: 'center' as 'center' },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      align: 'center' as 'center',
      key: 'createDate',
      render: (text: string) => new Date(text).toLocaleString('zh-CN', { hour12: false }), // 格式化为指定时间格式
    },
    {
      title: '封面图',
      dataIndex: 'cover',
      key: 'cover',
      align: 'center' as 'center',
      render: (cover: string) => <img src={cover} alt="封面" style={{ width: 50, height: 50 }} />,
    },
    { title: '书名', dataIndex: 'title', align: 'center' as 'center', key: 'title' },
    { title: '作者', dataIndex: 'author', align: 'center' as 'center', key: 'author' },
    { title: '描述', dataIndex: 'description', align: 'center' as 'center', key: 'description' },
    {
      title: '更新时间',
      dataIndex: 'updateDate',
      align: 'center' as 'center',
      key: 'updateDate',
      render: (text: string) => new Date(text).toLocaleString('zh-CN', { hour12: false }), // 格式化为指定时间格式
    },
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
      <Form className="check-form" layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item className="content-width" label="书名">
          <Input
            value={query.title}
            onChange={(e) => setQuery({ ...query, title: e.target.value })}
            placeholder="请输入书名"
            allowClear
          />
        </Form.Item>
        <Form.Item className="content-width" label="作者">
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

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleNew}
        style={{ marginBottom: 16, float: 'right' }}
      >
        新建
      </Button>

      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        loading={loading}// 确保在加载时显示 loading
        pagination={{
          pageSize: 10, // 每页显示 10 条数据
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
