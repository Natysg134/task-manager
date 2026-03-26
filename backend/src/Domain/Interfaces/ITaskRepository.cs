using Domain.Entities;

namespace Domain.Interfaces;

public interface ITaskRepository
{
  Task<IEnumerable<TaskItem>> GetAllAsync();
  Task<TaskItem?> GetByIdAsync(int id);
  Task<TaskItem> AddAsync(TaskItem task);
  Task<TaskItem> UpdateAsync(TaskItem task);
  Task DeleteAsync(TaskItem task);
}