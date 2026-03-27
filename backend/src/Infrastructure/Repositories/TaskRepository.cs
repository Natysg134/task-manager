using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;

namespace Infrastructure.Repositories;

public class TaskRepository : ITaskRepository
{
  private readonly AppDbContext _context;

  public TaskRepository(AppDbContext context)
  {
      _context = context;
  }

  public async Task<IEnumerable<TaskItem>> GetAllAsync()
  {
      return await _context.Tasks
          .OrderByDescending(t => t.CreatedAt)
          .ToListAsync();
  }

  public async Task<TaskItem?> GetByIdAsync(int id)
  {
      return await _context.Tasks.FindAsync(id);
  }

  public async Task<TaskItem> AddAsync(TaskItem task)
  {
      _context.Tasks.Add(task);
      await _context.SaveChangesAsync();
      return task;
  }

  public async Task<TaskItem> UpdateAsync(TaskItem task)
  {
      _context.Tasks.Update(task);
      await _context.SaveChangesAsync();
      return task;
  }
  public async Task DeleteAsync(TaskItem task)
  {
    // Mark as deleted instead of removing the row
    task.Delete();
    _context.Tasks.Update(task);
    await _context.SaveChangesAsync();
  }
}