using Application.DTOs;

namespace Application.Interfaces;

public interface ITaskService
{
  Task<IEnumerable<TaskDto>> GetAllTasksAsync();
  Task<TaskDto> CreateTaskAsync(CreateTaskDto dto);
  Task<TaskDto> ToggleTaskAsync(int id);
  Task DeleteTaskAsync(int id);
}