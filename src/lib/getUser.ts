export const getUser = (id: number) => {

  if (id < 1) throw new Error('Invalid ID');

  return {
    id,
    name: `name-${id}`
  };
}
