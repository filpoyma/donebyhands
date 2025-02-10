import React from 'react';

const useSearchDebounce = (search: string = '') => {
  const [values, setValues] = React.useState({
    search: search,
  });
  const [debouncedValue, setDebouncedValue] = React.useState(search);
  React.useEffect(() => {
    if (values.search.length < 3) return setDebouncedValue('');
    const timeoutId = setTimeout(() => {
      setDebouncedValue(values.search); //request
    }, 350);
    return () => timeoutId && clearTimeout(timeoutId);
  }, [values.search]);
  return {
    values,
    debouncedValue,
    setValues,
  };
};

export default useSearchDebounce;
