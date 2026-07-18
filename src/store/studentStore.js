import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStudentStore = create(
  persist(
    (set) => ({
      students: [],
      setStudents: (students) => set({ students }),
    }),
    {
      name: 'insight-ed-students', // unique name for localStorage key
    }
  )
);

export default useStudentStore;
