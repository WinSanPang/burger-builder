import { useState, useEffect } from 'react';

export default httpClient => {
  const [error, setError] = useState(null);

      const reqInterceptior = httpClient.interceptors.request.use(req => {
          setError(null);
          return req;
      });
      const resInterceptior = httpClient.interceptors.response.use(res => res, errorMessage => {
          setError(errorMessage);
      });

      useEffect(() => {
          return () => {
              httpClient.interceptors.request.eject(reqInterceptior);
              httpClient.interceptors.response.eject(resInterceptior);
          };
      }, [reqInterceptior, resInterceptior]);

  const errorConfirmedHandler = () => {
      setError(null);
  }

  return [error, errorConfirmedHandler];
};

