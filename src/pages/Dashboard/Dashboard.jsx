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
        <StatCard title="Total Students" value={mockDashboardStats.totalStudents} icon={Users} />
        <StatCard title="Attendance Today" value={`${mockDashboardStats.attendanceToday}%`} icon={CalendarCheck} />
        <StatCard title="Students Needing Support" value={mockDashboardStats.studentsNeedingSupport} icon={AlertTriangle} />
        <StatCard title="Classes Monitored" value={mockDashboardStats.classesMonitored} icon={BookOpen} />
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
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-border-subtle bg-paper/50">
                      <th className="px-6 py-3 font-semibold text-text-secondary text-sm whitespace-nowrap">Student</th>
                      <th className="px-6 py-3 font-semibold text-text-secondary text-sm whitespace-nowrap">Class</th>
                      <th className="px-6 py-3 font-semibold text-text-secondary text-sm">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attentionStudents.map((item, idx) => (
                      <tr key={idx} className="border-b border-border-subtle last:border-none hover:bg-paper-light transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <Avatar name={item.name} size="sm" />
                            <span className="font-semibold text-navy">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-navy whitespace-nowrap">{item.class}</td>
                        <td className="px-6 py-4 text-sm text-text-secondary min-w-[200px]">{item.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-border-subtle bg-paper/50">
                      <th className="px-6 py-3 font-semibold text-text-secondary text-sm whitespace-nowrap">Class</th>
                      <th className="px-6 py-3 font-semibold text-text-secondary text-sm">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attentionClasses.map((item, idx) => (
                      <tr key={idx} className="border-b border-border-subtle last:border-none hover:bg-paper-light transition-colors">
                        <td className="px-6 py-4 font-semibold text-navy whitespace-nowrap">{item.class}</td>
                        <td className="px-6 py-4 text-sm text-text-secondary min-w-[200px]">{item.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-colors cursor-pointer ${
                    task.completed ? 'border-success/30 bg-success-light/30' : 'border-border-subtle hover:border-gold/50'
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  <div className={`mt-0.5 shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    task.completed ? 'border-success bg-success' : 'border-text-muted'
                  }`}>
                    {task.completed && <Check size={14} className="text-white" />}
                  </div>
                  <span className={`text-sm ${task.completed ? 'text-text-muted line-through' : 'text-navy font-medium'}`}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>

            {isAddingTask ? (
              <form onSubmit={addTask} className="mt-auto flex flex-col gap-3 p-4 bg-paper-light rounded-xl border border-border-subtle">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="What needs to be done?" 
                  className="input-tactile py-2 px-3 text-sm"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  disabled={isSavingTask}
                />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="ghost" className="px-3 py-1.5 text-xs" onClick={() => setIsAddingTask(false)} disabled={isSavingTask}>Cancel</Button>
                  <Button type="submit" variant="primary" className="px-4 py-1.5 text-xs" isLoading={isSavingTask}>Save Task</Button>
                </div>
              </form>
            ) : (
              <Button 
                variant="outline" 
                className="w-full mt-auto border-dashed border-2 text-text-secondary hover:text-navy hover:border-navy shrink-0"
                onClick={() => setIsAddingTask(true)}
              >
                <Plus size={18} /> Add Task
              </Button>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
