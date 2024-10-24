import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { deleteItem, updateAll } from '../../slices/burgerConstructor';
import { TConstructorIngredient } from '@utils-types';

const moveItem = (
  array: TConstructorIngredient[],
  index: number,
  offset: number
): TConstructorIngredient[] => {
  const updatedArray = [...array];
  const item = updatedArray.splice(index, 1)[0];
  updatedArray.splice(index + offset, 0, item);
  return updatedArray;
};

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { ingredients } = useSelector(
      (store: RootState) => store.burgerConstructor
    );

    const handleMoveDown = () => {
      if (index < ingredients.length - 1) {
        dispatch(updateAll(moveItem(ingredients, index, 1)));
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(updateAll(moveItem(ingredients, index, -1)));
      }
    };

    const handleClose = () => {
      dispatch(deleteItem(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
