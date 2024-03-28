import { Pagination } from "@nextui-org/react";

interface IListPaginationProps {
  currentPage: number;
  totalPages: number;
  pageController: any;
}

function ListPagination(props: IListPaginationProps) {
  return (
    <Pagination
      total={props.totalPages}
      page={props.currentPage}
      onChange={props.pageController}
      showControls
    />
  );
}

export default ListPagination;
