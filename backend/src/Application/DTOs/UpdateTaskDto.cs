using System.ComponentModel.DataAnnotations;

namespace Application.DTOs;

public class UpdateTaskDto
{
  [Required]
  [MinLength(1)]
  [MaxLength(100)]
  public string Title { get; set; } = string.Empty;

  [MaxLength(100)]
  public string? Description { get; set; }
  public DateTime? DueAt { get; set; }

  public bool IsCompleted { get; set; }
}