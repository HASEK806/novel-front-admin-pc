import React from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface NovelFormProps {
  initialValues?: any;
  onSave: (values: any) => void;
  onCancel: () => void;
}

const NovelForm: React.FC<NovelFormProps> = ({ initialValues, onSave, onCancel }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSave(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      layout="vertical"
      onFinish={handleFinish}
    >
      <Form.Item label="书名" name="title" rules={[{ required: true, message: '请输入书名！' }]}>
        <Input placeholder="请输入书名" />
      </Form.Item>

      <Form.Item label="作者" name="author" rules={[{ required: true, message: '请输入作者！' }]}>
        <Input placeholder="请输入作者" />
      </Form.Item>

      <Form.Item label="封面图" name="cover">
        <Upload listType="picture" maxCount={1}>
          <Button icon={<UploadOutlined />}>上传封面图</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="描述" name="description">
        <Input.TextArea rows={4} placeholder="请输入描述" />
      </Form.Item>

      <div style={{ textAlign: 'right' }}>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          取消
        </Button>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </div>
    </Form>
  );
};

export default NovelForm;
