import React, { useState } from 'react';
import { Users, CalendarCheck, AlertTriangle, BookOpen, Check, Plus, AlertCircle } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import EmptyState from '../../components/common/EmptyState';
import { mockDashboardStats, attentionStudents, attentionClasses, initialTasks } from '../../data/mockData';

const Dashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskText, setNewTaskText] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isSavingTask, setIsSavingTask] = useState(false);

  const completedTasksCount = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    
    setIsSavingTask(true);

    // Simulate network save
    setTimeout(() => {
      const newTask = {
        id: Date.now(),
        text: newTaskText.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
      setIsSavingTask(false);
      setIsAddingTask(false);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">What needs my attention today?</h1>
        <p className="text-text-secondary">Overview of critical items requiring your focus.</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={mockDashboardStats.totalStudents} icon={Users} color="pink" />
        <StatCard title="Classes Monitored" value={mockDashboardStats.classesMonitored} icon={BookOpen} color="green" />
        <StatCard title="Attendance Today" value={`${mockDashboardStats.attendanceToday}%`} icon={CalendarCheck} color="blue" />
        <StatCard title="Students Needing Support" value={mockDashboardStats.studentsNeedingSupport} icon={AlertTriangle} color="brown" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Tables */}
        <div className="lg:col-span-2 flex flex-col gap-6 w-full overflow-hidden">
          <Card noPadding>
            <div className="p-6 border-b border-border-subtle bg-paper-light">
              <h3 className="font-semibold text-navy flex items-center gap-2">
                <AlertCircle size={20} className="text-danger" /> 
                Students Needing Attention
              </h3>
            </div>
            
            {attentionStudents.length === 0 ? (
              <EmptyState title="All clear!" description="No students currently require immediate attention." />
            ) : (
              <div className="flex flex-col gap-3 px-6 pb-6">
                <div className="grid grid-cols-12 gap-4 px-5 py-2 border-b border-border-subtle text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                  <div className="col-span-4">Student</div>
                  <div className="col-span-2">Class</div>
                  <div className="col-span-6">Reason</div>
                </div>
                {attentionStudents.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-4 items-center p-4 bg-white/50 backdrop-blur-md rounded-2xl border border-white shadow-[0_4px_12px_rgba(31,38,135,0.03)] hover:shadow-[0_8px_20px_rgba(31,38,135,0.06)] hover:-translate-y-0.5 transition-all">
                    <div className="col-span-4 flex items-center gap-3">
                      <Avatar name={item.name} size="sm" />
                      <span className="font-bold text-navy">{item.name}</span>
                    </div>
                    <div className="col-span-2 font-medium text-navy">{item.class}</div>
                    <div className="col-span-6 text-sm text-text-secondary truncate">{item.reason}</div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card noPadding>
            <div className="p-6 border-b border-border-subtle bg-paper-light">
              <h3 className="font-semibold text-navy flex items-center gap-2">
                <AlertCircle size={20} className="text-warning" /> 
                Classes Requiring Attention
              </h3>
            </div>
            
            {attentionClasses.length === 0 ? (
              <EmptyState title="All clear!" description="No classes currently require immediate attention." />
            ) : (
              <div className="flex flex-col gap-3 px-6 pb-6">
                <div className="grid grid-cols-12 gap-4 px-5 py-2 border-b border-border-subtle text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                  <div className="col-span-4">Class</div>
                  <div className="col-span-8">Reason</div>
                </div>
                {attentionClasses.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-4 items-center p-4 bg-white/50 backdrop-blur-md rounded-2xl border border-white shadow-[0_4px_12px_rgba(31,38,135,0.03)] hover:shadow-[0_8px_20px_rgba(31,38,135,0.06)] hover:-translate-y-0.5 transition-all">
                    <div className="col-span-4 font-bold text-navy">{item.class}</div>
                    <div className="col-span-8 text-sm text-text-secondary truncate">{item.reason}</div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Tasks */}
        <div className="flex flex-col gap-6">
          <Card className="flex flex-col h-[500px] lg:h-full">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-navy">Today's Tasks</h3>
              <span className="text-sm font-semibold text-navy bg-gold-light px-3 py-1 rounded-full">
                {completedTasksCount} / {totalTasks}
              </span>
            </div>
            <p className="text-sm text-text-muted mb-6">{completedTasksCount} of {totalTasks} tasks completed today</p>
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-paper rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-success transition-all duration-500 rounded-full" 
                style={{ width: `${totalTasks === 0 ? 0 : (completedTasksCount / totalTasks) * 100}%` }}
              />
            </div>

            <div className="flex flex-col gap-3 flex-1 overflow-y-auto mb-4 pr-2">
              {tasks.length === 0 && !isAddingTask && (
                <div className="my-auto">
                  <EmptyState title="No tasks" description="You have a clear schedule today." />
                </div>
              )}
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer shadow-[0_4px_12px_rgba(31,38,135,0.03)] hover:shadow-[0_8px_20px_rgba(31,38,135,0.06)] hover:-translate-y-0.5 ${
                    task.completed ? 'border-success/20 bg-success-light/40 backdrop-blur' : 'bg-white/50 backdrop-blur-md border-white/60 hover:border-gold/30'
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                    task.completed ? 'border-success bg-success' : 'border-text-muted/50 bg-white'
                  }`}>
                    {task.completed && <Check size={16} className="text-white" />}
                  </div>
                  <span className={`text-[15px] leading-relaxed ${task.completed ? 'text-text-muted line-through' : 'text-navy font-semibold'}`}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>

            {isAddingTask ? (
              <form onSubmit={addTask} className="mt-auto flex flex-col gap-3 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-[0_4px_12px_rgba(31,38,135,0.03)]">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="What needs to be done?" 
                  className="w-full bg-transparent border-none outline-none text-navy placeholder-text-muted text-[15px] font-medium"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  disabled={isSavingTask}
                />
                <div className="flex justify-end gap-2 pt-2 border-t border-border-subtle">
                  <Button type="button" variant="ghost" className="px-4 py-2 text-sm rounded-xl" onClick={() => setIsAddingTask(false)} disabled={isSavingTask}>Cancel</Button>
                  <Button type="submit" variant="primary" className="px-5 py-2 text-sm rounded-xl shadow-md" isLoading={isSavingTask}>Save Task</Button>
                </div>
              </form>
            ) : (
              <Button 
                variant="primary" 
                className="w-full mt-auto bg-navy text-white shadow-[0_8px_20px_rgba(27,37,65,0.15)] hover:shadow-[0_12px_24px_rgba(27,37,65,0.2)] rounded-[20px] font-bold text-[15px] h-14 shrink-0 transition-all"
                onClick={() => setIsAddingTask(true)}
              >
                <Plus size={20} className="mr-2" /> Add Task
              </Button>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
