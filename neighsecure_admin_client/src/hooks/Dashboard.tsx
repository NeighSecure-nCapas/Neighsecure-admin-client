import axios from 'axios';
import { toast } from 'sonner';
import { mutate } from 'swr';
import { redirect, useNavigate } from "react-router-dom";

export const GET = async (url: string) => {
  const token = localStorage.getItem('neigh_secure_token');
  try {
    const res = await axios.get(
      url,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (res.status != 200) {
      throw new Error('Error fetching entry');
    }

    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

export const POST = async (url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
) => {
  const token = localStorage.getItem('neigh_secure_token');
  try {
    toast.promise(axios.post(
        url,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ),
      {
        loading: 'Creating ...',
        success: (payload) => {
          if (payload.status == 400 || payload.status == 401 || payload.status == 403 || payload.status == 404 || payload.status == 500) {
            throw new Error('Error creating resource');
          }
          return 'Resource created successfully';
        },
        error: (e) => {
          return e.response.data.message;
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
};

export const AddNewHome = async (url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('neigh_secure_token');
  try {
    toast.promise(axios.post(
        url,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ),
      {
        loading: 'Creating ...',
        success: (payload) => {
          if (payload.status == 400 || payload.status == 401 || payload.status == 403 || payload.status == 404 || payload.status == 500) {
            throw new Error('Error creating resource');
          }
          mutate('/admin/homes?page=0&size=10');
          navigate('/admin/hogares');
          return 'Resource created successfully';
        },
        error: (e) => {
          return e.response.data.message;
        }
      }
    );
  } catch (e) {
    toast.error('Error adding home' + e);
  }
};


export const PATCH = async (url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  mutateURL?: string
) => {
  const token = localStorage.getItem('neigh_secure_token');
  toast.promise(axios.patch(
      url,
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    ),
    {
      loading: 'Updating ...',
      success: (payload) => {
        if (payload.status != 200) {
          throw new Error('Error updating resource');
        }
        mutate(mutateURL || url);
        return 'Resource updated successfully';
      },
      error: (e) => {
        return e.response.data.message;
      }
    }
  );
};

export const deleteEntries = async (url: string) => {
  const token = localStorage.getItem('neigh_secure_token');
  try {
    toast.promise(axios.delete(
        url,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ),
      {
        loading: 'Deleting entry...',
        success: (payload) => {
          if (payload.status != 200) {
            throw new Error('Error fetching entry');
          }
          mutate('/admin/entries');
          return 'Entry deleted successfully';
        },
        error: 'Error deleting entry'
      }
    );
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = async (url: string, role: string) => {
  const token = localStorage.getItem('neigh_secure_token');
  try {
    toast.promise(axios.patch(
        url,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ),
      {
        loading: 'Deleting user...',
        success: (payload) => {
          if (payload.status != 200) {
            throw new Error('Error fetching entry');
          }
          mutate(`/admin/users/role/${role}`);
          return 'User deleted successfully';
        },
        error: 'Error deleting user'
      }
    );
  } catch (e) {
    console.log(e);
  }
};

export const deleteHome = async (url: string) => {
  const token = localStorage.getItem('neigh_secure_token');
  try {
    toast.promise(axios.patch(
        url,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ),
      {
        loading: 'Deleting home...',
        success: (payload) => {
          if (payload.status != 200) {
            throw new Error('Error deleting home');
          }
          mutate('/admin/homes');
          redirect('/admin/hogares');
          return 'Home deleted successfully';
        },
        error: 'Error deleting home'
      }
    );
  } catch (e) {
    toast.error('Error deleting user' + e);
  }
};
