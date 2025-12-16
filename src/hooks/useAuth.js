import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../api/auth';

/**
 * Custom hook for authentication
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /**
   * Login mutation
   */
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Store login status
      localStorage.setItem('isLoggedIn', 'true');
      
      // Store user data if available
      if (data.user || data.data?.user) {
        const user = data.user || data.data.user;
        localStorage.setItem('user', JSON.stringify(user));
      }

      // Invalidate and refetch any user-related queries
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  /**
   * Login function with callbacks
   */
  const handleLogin = (credentials, callbacks = {}) => {
    loginMutation.mutate(credentials, {
      onSuccess: (data) => {
        // Default success handler
        localStorage.setItem('isLoggedIn', 'true');
        
        if (data.user || data.data?.user) {
          const user = data.user || data.data.user;
          localStorage.setItem('user', JSON.stringify(user));
        }

        queryClient.invalidateQueries({ queryKey: ['user'] });
        
        // Call custom success callback if provided
        if (callbacks.onSuccess) {
          callbacks.onSuccess(data);
        }
      },
      onError: (error) => {
        // Call custom error callback if provided
        if (callbacks.onError) {
          callbacks.onError(error);
        }
      },
    });
  };

  /**
   * Logout function
   */
  const handleLogout = () => {
    logout();
    queryClient.clear();
    navigate('/login');
  };

  return {
    login: handleLogin,
    loginAsync: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    isError: loginMutation.isError,
    isSuccess: loginMutation.isSuccess,
    logout: handleLogout,
  };
};

