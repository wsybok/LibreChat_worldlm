import { RecoilRoot } from 'recoil';
import { DndProvider } from 'react-dnd';
import { RouterProvider } from 'react-router-dom';
import * as RadixToast from '@radix-ui/react-toast';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { ScreenshotProvider, ThemeProvider, useApiErrorBoundary } from './hooks';
import { ToastProvider } from './Providers';
import Toast from './components/ui/Toast';
import { LiveAnnouncer } from '~/a11y';
import { router } from './routes';

const App = () => {
  const { setError } = useApiErrorBoundary();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        setError(error);
      },
    }),
  });

  return (
    <RecoilRoot>
      <DndProvider backend={HTML5Backend}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <ScreenshotProvider>
              <ToastProvider>
                <RadixToast.Provider>
                  <LiveAnnouncer>
                    <RouterProvider router={router} />
                    <Toast />
                    <ReactQueryDevtools initialIsOpen={false} />
                    {/* 添加的测试元素 */}
                    <h1>Welcome to My Modified LibreChat!</h1>
                  </LiveAnnouncer>
                </RadixToast.Provider>
              </ToastProvider>
            </ScreenshotProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </DndProvider>
    </RecoilRoot>
  );
};

export default App;