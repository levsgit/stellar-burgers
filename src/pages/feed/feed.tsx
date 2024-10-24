import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  AppDispatch,
  RootState,
  useDispatch,
  useSelector
} from '../../services/store';
import { getFeedsThunk } from '../../slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, []);

  const orders: TOrder[] = useSelector(
    (store: RootState) => store.feeds.orders
  );

  const handleGetFeeds = () => {
    dispatch(getFeedsThunk());
  };

  return <FeedUI orders={orders} handleGetFeeds={() => handleGetFeeds()} />;
};
