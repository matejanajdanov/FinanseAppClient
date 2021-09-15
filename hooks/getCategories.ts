import { useCurrentUserQuery } from 'generated/generate';

export const getCategories = () => {
  const { data } = useCurrentUserQuery();
  if (data?.currentUser?.category && data?.currentUser?.category?.length > 0) {
    const optionsArray: { text: string; key: string; value: string }[] = [];
    optionsArray.push({ key: '0', text: 'None', value: '0' });
    data.currentUser.category.forEach((category) => {
      optionsArray.push({
        key: category.id,
        text: category.categoryName,
        value: category.id,
      });
    });
    return optionsArray;
  }
  return [];
};
