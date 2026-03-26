using Microsoft.AspNetCore.Mvc;
using TaskManager.Application.DTOs;
using TaskManager.Application.Interfaces;

namespace TaskManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
  private readonly ITaskService _taskService;

  public TasksController(ITaskService taskService)
  {
      _taskService = taskService;
  }

  [HttpGet]
  public async Task<IActionResult> GetAll()
  {
      var tasks = await _taskService.GetAllTasksAsync();
      return Ok(tasks);
  }

  [HttpPost]
  public async Task<IActionResult> Create([FromBody] CreateTaskDto dto)
  {
      if (!ModelState.IsValid)
          return BadRequest(ModelState);

      var task = await _taskService.CreateTaskAsync(dto);
      return CreatedAtAction(nameof(GetAll), new { id = task.Id }, task);
  }

  [HttpPatch("{id}/toggle")]
  public async Task<IActionResult> Toggle(int id)
  {
      var task = await _taskService.ToggleTaskAsync(id);
      return Ok(task);
      // KeyNotFoundException bubbles up to ExceptionHandlingMiddleware
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
      await _taskService.DeleteTaskAsync(id);
      return NoContent();
  }
}