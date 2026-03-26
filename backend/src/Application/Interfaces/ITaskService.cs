using Application.DTOs;

namespace Application.Interfaces;

public interface ITaskService
{
  Task<IEnumerable<TaskDto>> GetAllTasksAsync();
  Task<TaskDto> CreateTaskAsync(CreateTaskDto dto);
  Task<TaskDto> UpdateTaskAsync(int id, UpdateTaskDto dto);
  Task DeleteTaskAsync(int id);
}