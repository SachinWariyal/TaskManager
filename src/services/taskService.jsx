// src/services/taskService.js
export const taskService = {
  getAll: (userId) => {
    const data = JSON.parse(localStorage.getItem('tasks') || '[]');
    return data.filter((task) => task.userId === userId);
  },
  create: (task) => {
    const data = JSON.parse(localStorage.getItem('tasks') || '[]');
    task.id = Date.now();
    localStorage.setItem('tasks', JSON.stringify([...data, task]));
  },
  update: (taskId, updated) => {
    let data = JSON.parse(localStorage.getItem('tasks') || '[]');
    data = data.map((t) => (t.id === taskId ? { ...t, ...updated } : t));
    localStorage.setItem('tasks', JSON.stringify(data));
  },
  remove: (taskId) => {
    const data = JSON.parse(localStorage.getItem('tasks') || '[]');
    localStorage.setItem('tasks', JSON.stringify(data.filter((t) => t.id !== taskId)));
  },
  getById: (taskId) => {
    const data = JSON.parse(localStorage.getItem('tasks') || '[]');
    return data.find((t) => t.id === taskId);
  },
  bulkImport: (importedTasks, userId) => {
    const current = JSON.parse(localStorage.getItem('tasks') || '[]');
    const tasks = importedTasks.map((t) => ({
      id: Date.now() + Math.floor(Math.random() * 1000),
      userId,
      title: t.title || '',
      description: t.description || '',
      effort_days: Number(t.effort_days || t.effort || 1),
      due_date: t.due_date || new Date().toISOString().split('T')[0]
    }));
    localStorage.setItem('tasks', JSON.stringify([...current, ...tasks]));
  }
};
