import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAttendanceStore = create(
  persist(
    (set, get) => ({
      records: {}, // { classSection: { date: { studentId: 'present' | 'absent' | 'late' } } }
      
      saveAttendance: (classSection, date, data) => set((state) => ({
        records: {
          ...state.records,
          [classSection]: {
            ...(state.records[classSection] || {}),
            [date]: data,
          }
        }
      })),
      
      getAttendance: (classSection, date) => {
        const state = get();
        return state.records[classSection]?.[date] || null;
      }
    }),
    {
      name: 'insighted-attendance-store',
    }
  )
);

export default useAttendanceStore;
