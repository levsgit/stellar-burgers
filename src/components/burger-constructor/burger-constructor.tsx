import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  isAuthCheckedSelector,
  RootState
} from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { newOrderThunk, resetOrder } from '../../slices/newOrderSlice';
import { clearAll } from '../../slices/burgerConstructor';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const constructorItems = useSelector(
    (store: RootState) => store.burgerConstructor
  );

  const orderRequest = useSelector(
    (store: RootState) => store.newOrder.request
  );

  const orderModalData = useSelector(
    (store: RootState) => store.newOrder.orderData
  );

  const isAuthChecked = useSelector(isAuthCheckedSelector);

  const onOrderClick = () => {
    if (!isAuthChecked) {
      navigate('/login');
      return;
    }

    if (!constructorItems || !constructorItems.bun || orderRequest) return;

    const { bun, ingredients } = constructorItems;

    const data: string[] = (bun as TConstructorIngredient | null)
      ? [bun._id].concat(ingredients.map(({ _id }: { _id: string }) => _id))
      : [];

    dispatch(newOrderThunk(data));
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(clearAll());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
