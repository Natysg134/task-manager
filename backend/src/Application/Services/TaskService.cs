using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services;

public class TaskService : ITaskService
{
  private readonly ITaskRepository _repository;

  public TaskService(ITaskRepository repository)
  {
      _repository = repository;
  }

  public async Task<IEnumerable<TaskDto>> GetAllTasksAsync()
  {
      var tasks = await _repository.GetAllAsync();
      return tasks.Select(MapToDto);
  }

  public async Task<TaskDto> CreateTaskAsync(CreateTaskDto dto)
  {
      var task = new TaskItem
      {
          Title = dto.Title.Trim(),
          Details = dto.Details?.Trim() ?? string.Empty,
          DueAt = dto.DueAt ?? null
      };

      var created = await _repository.AddAsync(task);
      return MapToDto(created);
  }

  public async Task<TaskDto> UpdateTaskAsync(int id, UpdateTaskDto dto)
  {
      var task = await _repository.GetByIdAsync(id)
          ?? throw new KeyNotFoundException($"Task {id} not found.");

      task.Title = dto.Title.Trim();
      task.Details = dto.Details?.Trim() ?? string.Empty;
      task.DueAt = dto.DueAt ?? null;
      task.IsCompleted = dto.IsCompleted;

      var updated = await _repository.UpdateAsync(task);
      return MapToDto(updated);
  }

  public async Task DeleteTaskAsync(int id)
  {
    var task = await _repository.GetByIdAsync(id)
          ?? throw new KeyNotFoundException($"Task {id} not found.");

      await _repository.DeleteAsync(task);
  }

  private static TaskDto MapToDto(TaskItem task) => new()
  {
    Id = task.Id,
    Title = task.Title,
    Details = task.Details,
    IsCompleted = task.IsCompleted,
    CreatedAt = task.CreatedAt,
    DueAt = task.DueAt
  };
}