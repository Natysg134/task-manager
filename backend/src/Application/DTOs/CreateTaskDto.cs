using System.ComponentModel.DataAnnotations;

namespace Application.DTOs;

public class CreateTaskDto
{
  [Required]
  [MinLength(1, ErrorMessage = "Title cannot be empty.")]
  [MaxLength(100, ErrorMessage = "Title cannot exceed 100 characters.")]
  public string Title { get; set; } = string.Empty;
}