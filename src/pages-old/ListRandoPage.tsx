import { Suspense } from "react";
import ListRando from "../features/rando/components/ListRando";
import { Skeleton } from "primereact/skeleton";

const ListRandoPage = () => {
  const LoadingSkeleton = () => {
    return (
      <>
        <Skeleton height="2rem" className="mb-2"></Skeleton>
        <Skeleton height="2rem" className="mb-2"></Skeleton>
        <Skeleton height="2rem" className="mb-2"></Skeleton>
        <Skeleton height="2rem" className="mb-2"></Skeleton>
        <Skeleton height="2rem" className="mb-2"></Skeleton>
      </>
    );
  };

  return (
    <>
      <Suspense fallback={<LoadingSkeleton></LoadingSkeleton>}>
        <ListRando></ListRando>
      </Suspense>
    </>
  );
};

export default ListRandoPage;
