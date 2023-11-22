import { useCallback, useState } from "react";
import useMount from "./useMount";

interface IOptions {
  manual: boolean;
  onSuccess: (res: unknown) => void;
  onError: (err: unknown) => void;
  onFinally: () => void;
}

/**
 * 1. 实现页面组件初始化的时候发送请求获取数据
 * 2. 手动触发请求
 * @param service
 * @param params
 * @returns
 */
const useRequest = (service: () => Promise<unknown>, options: IOptions) => {
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(false);

  const handler = useCallback(() => {
    setLoading(true);
    service()
      .then((res) => {
        setData(res);
        setLoading(false);
        options?.onSuccess(res);
      })
      .catch((error) => {
        setLoading(false);
        options?.onError(error);
      })
      .finally(options?.onFinally);
  }, [service]);

  useMount(() => {
    // 非手动才自动执行
    if (!options.manual) {
      handler();
    }
  });

  const run = () => {
    handler();
  };

  return { loading, data, run };
};

export default useRequest;
