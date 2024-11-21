import request from './axios';

export const getBooks = async (query?: { title?: string; author?: string }): Promise<any[]> => {
  const params = new URLSearchParams(query).toString();
  const response = await request.get(`/books?${params}`);
  return response.data;
};

export const createBook = (data: any) => {
  return request({
    url: '/books',
    method: 'POST',
    data,
  });
};

export const updateBook = (id: number, data: any) => {
  return request({
    url: `/books/${id}`,
    method: 'PUT',
    data,
  });
};

export const deleteBook = (id: number) => {
  return request({
    url: `/books/${id}`,
    method: 'DELETE',
  });
};
