export const getFavorites = (): string[] | null => {
  if (typeof window !== "undefined") {
    const savedFavorites = localStorage.getItem("favourites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  }
  return null;
};

export const setFavorites = (favorites: string[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("favourites", JSON.stringify(favorites));
  }
};
