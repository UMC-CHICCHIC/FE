export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      const isString = typeof value === "string";
      window.localStorage.setItem(
        key,
        isString ? value : JSON.stringify(value)
      );
    } catch (e) {
      console.error("로컬 스토리지 셋팅 에러", e);
    }
  };

  // accessToken이 null, string인 경우 + setItem을 string 형식으로 안받을 때 (JSON.stringify) parsing 처리
  const getItem = (): string | null => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return null;

      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch (e) {
      console.error("로컬 스토리지로부터 읽기에 실패하였음", e);
      return null;
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.error("로컬 스토리지 삭제 에러", e);
    }
  };

  return { getItem, setItem, removeItem };
};
