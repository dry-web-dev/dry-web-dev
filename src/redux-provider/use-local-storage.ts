export const useLocalStorage = <T>(key: string, defaultState: T) => {
  return {
      updateLocalStorage: (data: T | null = null) => {
          if (!data) return localStorage.removeItem(key);
          localStorage.setItem(key, JSON.stringify(data));
      },
      readLocalStorage: (): T  => {
          if (typeof window !== 'undefined') {
            const data = localStorage.getItem(key);
            return !!data && data !== "undefined"
              ? JSON.parse(data) 
              : defaultState;
          } 
          return defaultState;
        },
        
  }
}
