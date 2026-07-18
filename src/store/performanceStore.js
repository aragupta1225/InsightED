import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePerformanceStore = create(
  persist(
    (set, get) => ({
      tests: {}, // { classSection: { testName: { subject, maxMarks, date, marks: [{ id, rollNo, name, marks }] } } }
      
      saveTest: (classSection, testName, testDetails) => set((state) => ({
        tests: {
          ...state.tests,
          [classSection]: {
            ...(state.tests[classSection] || {}),
            [testName]: testDetails,
          }
        }
      })),
      
      getTestsForClass: (classSection) => {
        const state = get();
        return state.tests[classSection] || {};
      },
      
      getTest: (classSection, testName) => {
        const state = get();
        return state.tests[classSection]?.[testName] || null;
      }
    }),
    {
      name: 'insighted-performance-store',
    }
  )
);

export default usePerformanceStore;
