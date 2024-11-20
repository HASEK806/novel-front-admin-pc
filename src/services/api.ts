import request from './axios';

export const getBooks = (params: any) => {
  return request({
    url: '/books',
    method: 'GET',
    params,
  });
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
