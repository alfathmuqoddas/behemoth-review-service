export const getPagination = (queryPage: any, querySize: any) => {
  const page = parseInt(queryPage as string) || 1;
  const size = parseInt(querySize as string) || 10;
  const limit = size > 0 ? size : 10;
  const offset = (page > 0 ? page - 1 : 0) * limit;
  return { limit, offset, currentPage: page > 0 ? page : 1 };
};

export const formatPaginatedResponse = (
  count: number,
  limit: number,
  page: number,
  rows: any[]
) => ({
  totalItems: count,
  totalPages: Math.ceil(count / limit),
  currentPage: page,
  pageSize: limit,
  reviews: rows,
});
