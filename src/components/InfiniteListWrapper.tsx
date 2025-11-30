'use client';
import { useState, useEffect, useMemo, useRef, ReactNode } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Retry from '@/sections/common/Retry';

interface InfiniteListWrapperProps<T> {
  queryKey: string | any[];
  queryFn: ({ pageParam }: { pageParam?: number; search?: string }) => Promise<any>;
  renderItem: (item: T) => ReactNode;
  SkeletonComponent: React.ComponentType;
  placeholderIcon?: ReactNode;
  placeholderMessage?: string;
  pageSize?: number;
  fabProps?: {
    onClick: () => void;
    icon?: ReactNode;
    color?: 'primary' | 'secondary' | 'inherit' | 'default' | 'error' | 'info' | 'success' | 'warning';
    sx?: any;
  };
}

const debounce = (fn: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default function InfiniteListWrapper<T>({
  queryKey,
  queryFn,
  renderItem,
  SkeletonComponent,
  placeholderIcon,
  placeholderMessage = "No items found",
  pageSize = 10,
  fabProps,
}: InfiniteListWrapperProps<T>) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleDebounce = useMemo(
    () => debounce((value: string) => setDebouncedSearch(value), 500),
    []
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    handleDebounce(e.target.value);
  };

  const {
    data,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: Array.isArray(queryKey) ? [...queryKey, debouncedSearch] : [queryKey, debouncedSearch],
    queryFn: ({ pageParam = 1 }) => queryFn({ pageParam, search: debouncedSearch }),
    getNextPageParam: (lastPage) => {
      const cp = lastPage.data.currentPage;
      const lp = lastPage.data.lastPage;
      return cp < lp ? cp + 1 : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const reachedBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight - 200;

      if (reachedBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage]);

  const items: T[] = data?.pages.flatMap((page) => page.data.items) ?? [];

  return (
    <Box ref={scrollRef} sx={{ height: '100%', overflowY: 'auto', position: 'relative' }}>
      <Box
        sx={{
          p: 1.5,
          position: 'sticky',
          top: 0,
          backgroundColor: 'background.paper',
          zIndex: 10,
        }}
      >
        <TextField
          placeholder="Search..."
          variant="outlined"
          fullWidth
          size="small"
          value={search}
          onChange={onSearchChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {isError && (
        <Retry
          onRetry={refetch}
          message="Failed to load disease"
        />
      )}

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {isLoading && (
          <>
            <SkeletonComponent />
            <SkeletonComponent />
            <SkeletonComponent />
          </>
        )}

        {!isLoading && !isError && items.length === 0 && (
          <Box sx={{ py: 5, textAlign: 'center', color: 'text.secondary' }}>
            {placeholderIcon ?? <PersonOffIcon sx={{ fontSize: 48, opacity: 0.6 }} />}
            <Typography variant="body1" fontWeight={600}>
              {placeholderMessage}
            </Typography>
          </Box>
        )}

        {!isError && items.map(renderItem)}

        {isFetchingNextPage && (
          <>
            <SkeletonComponent />
            <SkeletonComponent />
            <SkeletonComponent />
          </>
        )}
      </List>

      {fabProps && (
        <Fab
          color={fabProps.color ?? 'primary'}
          aria-label="add"
          onClick={fabProps.onClick}
          sx={{
            position: 'fixed',
            bottom: 84,
            right: 26,
            zIndex: 1100,
            ...fabProps.sx,
          }}
        >
          {fabProps.icon ?? <AddIcon />}
        </Fab>
      )}
    </Box>
  );
}
